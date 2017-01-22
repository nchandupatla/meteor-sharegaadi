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

  canInvite() {
    if (!this.ride) {
      return false;
    }

    return !this.ride.public && this.ride.owner === Meteor.userId();
  }

  save() {
    Rides.update({
      _id: this.ride._id
    }, {
      $set: {
        name: this.ride.name,
        description: this.ride.description,
        public: this.ride.public,
        location: this.ride.location
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the ride...');
      } else {
        console.log('Done!');
      }
    });
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
    template: '<ride-details></ride-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
