import { Mongo } from 'meteor/mongo';

export const Parties = new Mongo.Collection('parties');

Parties.allow({
  insert(userId, party) {
    return userId;
  },
  update(userId, party, fields, modifier) {
    return userId;
  },
  remove(userId, party) {
    return userId;
  }
});
