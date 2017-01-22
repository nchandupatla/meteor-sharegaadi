import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './rideCreator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

/**
 * RideCreator component
 */
class RideCreator {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);

    this.subscribe('users');

    this.helpers({
      creator() {
        if (!this.ride) {
          return '';
        }

        const owner = this.ride.owner;

        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }

        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}

const name = 'rideCreator';

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    ride: '<'
  },
  controller: RideCreator
});
