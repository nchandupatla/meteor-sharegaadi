import { Mongo } from 'meteor/mongo';

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
});