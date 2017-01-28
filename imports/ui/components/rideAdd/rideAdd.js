import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './rideAdd.html';
import { Rides } from '../../../api/rides';

class RideAdd {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.ride = {};
    this.ride.rules = {};
    this.ride.contact = {};
    this.contactType='both';
     if(Meteor.user() && Meteor.user().services && (Meteor.user().services.facebook)){
       this.ride.contact.email = Meteor.user().services.facebook.email;
     }
    //this.options = [{ 'name': 'I am offering a ride', 'value': '0' }, { 'name': 'I am requesting a ride', 'value': '1' }]
   
}

  submit() {
    this.ride.owner = Meteor.userId();
    this.ride.public = true;
    this.ride.date=new Date(this.ride.date);
    this.ride.tags=$('.chips-initial').material_chip('data');
    
    //console.log('ride details '+JSON.stringify(this.ride))
  
    Rides.insert(this.ride);
    this.reset();
    $('#successPostModal').openModal();
  }

  closeHowItWorksModal() {
    $('#successPostModal').closeModal();
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
      controller: RideAdd,
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
