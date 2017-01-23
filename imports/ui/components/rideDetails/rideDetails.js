import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './rideDetails.html';
import { Rides } from '../../../api/rides';
import { name as RideMap } from '../rideMap/rideMap';

class RideDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.rideId = $stateParams.rideId;

    this.subscribe('rides');
    this.subscribe('users');

    this.location=[{
            id: 101,
            latitude:  42.3563941755867,
            longitude:-71.0363168884369
        }];

    this.helpers({
      ride() {
        return Rides.findOne({
          _id: $stateParams.rideId
        });
      },
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      isOwner() {
        if (!this.ride) {
          return false;
        }

        return this.ride.owner === Meteor.userId();
      }
    });
  
  }
   getUser(id){
    return Meteor.users.findOne(id);
  }
}

const name = 'rideDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  RideMap
]).component(name, {
  template,
  controllerAs: name,
  controller: RideDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('rideDetails', {
    url: '/rides/:rideId',
    template: '<ride-details></ride-details>'
  });
}
