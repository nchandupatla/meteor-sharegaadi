import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './rideAdd.html';
import { Rides } from '../../../api/rides';

class RideAdd {
  constructor() {
    this.ride = {};
    this.ride.rules={};
  }

  submit() {
    this.ride.owner = Meteor.userId();
    this.ride.public=true;

    //console.log('loc obj '+JSON.stringify(this.ride.chosenPlace))
    //console.log('loc details '+JSON.stringify(this.ride.chosenPlaceDetails))
    Rides.insert(this.ride);
    this.reset();
  }

  reset() {
    this.ride = {};
  }
}

const name = 'rideAdd';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: RideAdd
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('addRide', {
      url: '/addRide',
      template: template,
      controllerAs: name,
      controller: RideAdd
    });
}
