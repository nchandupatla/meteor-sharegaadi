import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
  Meteor
} from 'meteor/meteor';

import template from './rideAdd.html';
import {
  Rides
} from '../../../api/rides';
import {
  UserPost
} from '../../../api/userPosts';

class RideAdd {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.subscribe('users');
    this.subscribe('userpost');

    this.ride = {};
    this.ride.rules = {};
    this.ride.contact = {};
    this.contactType = 'both';

    if (Meteor.user() && Meteor.user().services && (Meteor.user().services.facebook)) {
      this.ride.contact.email = Meteor.user().services.facebook.email;

    }
  }

  isFormValid() {
     if(this.ride.fromLocation && this.ride.toLocation && this.ride.price
        && this.ride.date && this.ride.time && this.isContactValid()){
       return true;
     }
    return false;
  }

  submit() {
    if (this.isFormValid()) {
      this.ride.owner = Meteor.userId();
      this.ride.public = true;
      this.ride.date = new Date(this.ride.date);
      this.ride.tags = $('.chips-initial').material_chip('data');
      //console.log('ride details '+JSON.stringify(this.ride))
      this.ride.date = new Date(this.ride.date);
      Rides.insert(this.ride);
      var userpost={};
      if(Meteor.user().services.facebook){
      userpost.email =Meteor.user().services.facebook.email;
      userpost.name = Meteor.user().services.facebook.name;
      userpost.date = new Date();
      UserPost.insert(userpost);
      }
      this.reset();
      $('#successPostModal').openModal();
    }
  }

  closeHowItWorksModal() {
    $('#successPostModal').closeModal();
  }

  reset() {
    this.ride = {};
  }

  isContactValid() {
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(this.contactType == 'both' && this.ride.contact && this.ride.contact.mobile 
            && this.ride.contact.email) {
      return true;
    }
    if(this.contactType == 'mobile' && this.ride.contact 
           && this.ride.contact.mobile) {
      return true;
    }
    if(this.contactType == 'email' && this.ride.contact && this.ride.contact.email) {
      return true;
    }
    return false;
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
  .config(config)
  .directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

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