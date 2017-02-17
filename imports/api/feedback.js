import { Mongo } from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';

export const Feedback = new Mongo.Collection('feedback');
Feedback.allow({
  insert(userId, feedback) {
    return userId;
  },
  update(userId, feedback, fields, modifier) {
    return userId;
  },
  remove(userId, feedback) {
    return userId;
  }
})

if (Meteor.isServer) {
  Meteor.publish('feedbacks', function() {
    return Feedback.find({});
  });
}