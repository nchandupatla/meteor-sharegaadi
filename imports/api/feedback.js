import { Mongo } from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';

export const Feedback = new Mongo.Collection('feedback');
Feedback.allow({
  insert(feedback) {
    return true;
  },
  update(feedback, fields, modifier) {
    return true;
  },
  remove(feedback) {
    return true;
  }
})

if (Meteor.isServer) {
  Meteor.publish('feedbacks', function() {
    return Feedback.find({});
  });
}