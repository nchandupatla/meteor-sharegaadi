import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Rides } from './collection';

if (Meteor.isServer) {
  Meteor.publish('myRides', function(options, searchString) {
    const selector = {
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
    };
    return Rides.find(selector, options);
  });
}
