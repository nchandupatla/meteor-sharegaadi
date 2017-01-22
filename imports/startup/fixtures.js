import { Meteor } from 'meteor/meteor';
import { Rides } from '../api/rides';

Meteor.startup(() => {
  // if (Rides.find().count() === 0) {
  //   const rides = [{
  //     'name': 'Dubstep-Free Zone',
  //     'description': 'Fast just got faster with Nexus S.',
  //     'public':true
  //   }, {
  //     'name': 'All dubstep all the time',
  //     'description': 'Get it on!',
  //     'public':true
  //   }, {
  //     'name': 'Savage lounging',
  //     'description': 'Leisure suit required. And only fiercest manners.',
  //     'public':true
  //   }];

  //   rides.forEach((ride) => {
  //     Rides.insert(ride)
  //   });
  //}
});
