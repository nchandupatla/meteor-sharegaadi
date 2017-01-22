import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { Rides } from './collection';

function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;

  return null;
}

export function invite(rideId, userId) {
  check(rideId, String);
  check(userId, String);

  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }

  const ride = Rides.findOne(rideId);

  if (!ride) {
    throw new Meteor.Error(404, 'No such ride!');
  }

  if (ride.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }

  if (ride.public) {
    throw new Meteor.Error(400, 'That ride is public. No need to invite people.');
  }

  if (userId !== ride.owner && ! _.contains(ride.invited, userId)) {
    Rides.update(rideId, {
      $addToSet: {
        invited: userId
      }
    });

    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));

    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@socially.com',
        subject: `ride: ${ride.title}`,
        text: `
          Hey, I just invited you to ${ride.title} on Socially.
          Come check it out: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function rsvp(rideId, rsvp) {
  check(rideId, String);
  check(rsvp, String);

  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }

  if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }

  const ride = Rides.findOne({
    _id: rideId,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is invited
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });

  if (!ride) {
    throw new Meteor.Error(404, 'No such ride');
  }

  const hasUserRsvp = _.findWhere(ride.rsvps, {
    user: this.userId
  });

  if (!hasUserRsvp) {
    // add new rsvp entry
    Rides.update(rideId, {
      $push: {
        rsvps: {
          rsvp,
          user: this.userId
        }
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    Rides.update({
      _id: rideId,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}

Meteor.methods({
  invite,
  rsvp
});
