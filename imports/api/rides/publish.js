import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Rides } from './collection';

if (Meteor.isServer) {
  Meteor.publish('rides', function(options, searchString) {
    const selector = {
      $or: [{
        // the public rides
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is one of invited
        $and: [{
          invited: this.userId
        }, {
          invited: {
            $exists: true
          }
        }]
      }]
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.fromLocation = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

    Counts.publish(this, 'numberOfRides', Rides.find(selector), {
      noReady: true
    });

    return Rides.find(selector, options);
  });
}
