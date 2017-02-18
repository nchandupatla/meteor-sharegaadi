import { Mongo } from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';

export const UserPost = new Mongo.Collection('userpost');
UserPost.allow({
  insert(userId, userpost) {
    return userId;
  },
  update(userId, userpost, fields, modifier) {
    return userId;
  },
  remove(userId, userpost) {
    return userId;
  }
})

if (Meteor.isServer) {
  Meteor.publish('userpost', function() {
    return UserPost.find({});
  });
}