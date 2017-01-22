import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        services:1
      }
    });
  });

  Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1, 'emails':1}});
});
}
