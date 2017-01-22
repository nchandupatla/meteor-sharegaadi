import { Mongo } from 'meteor/mongo';

export const Rides = new Mongo.Collection('rides');

Rides.allow({
  insert(userId, ride) {
    return userId;
  },
  update(userId, ride, fields, modifier) {
    return userId;
  },
  remove(userId, ride) {
    return userId;
  }
});
