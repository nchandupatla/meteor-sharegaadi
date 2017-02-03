import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Rides } from '../../../api/rides';
import template from './userRides.html';


class UserRides {
  constructor($stateParams, $scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);
    this.$state = $state;
    this.subscribe('myRides');

    this.helpers({
      rides() {
        return Rides.find();
    },
    currentUserId() {
        return Meteor.userId();
      }
  })
  }

  deleteRide(id){
    Rides.remove({_id:id}, (error) => {
      if (error) {
        Materialize.toast('Not Succesful in deleting your Post. Please try again.', 4000) ;
      } else {
        Materialize.toast('Successfully Deleted Your Post', 4000) ;
      }
    });
    
  }
}

const name = 'userRides';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: UserRides
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('myRides', {
      url: '/myRides',
      template: template,
      controllerAs: name,
      controller: UserRides,
    });
}
