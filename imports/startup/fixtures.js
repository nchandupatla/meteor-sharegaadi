import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties';

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.',
      'public':true
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!',
      'public':true
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.',
      'public':true
    }];

    parties.forEach((party) => {
      Parties.insert(party)
    });
  }
});
