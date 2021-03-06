import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import './ridesList.css';
import template from './ridesList.html';
import { Rides } from '../../../api/rides';
import { name as RidesSort } from '../ridesSort/ridesSort';
import { name as RidesMap } from '../ridesMap/ridesMap';
import { name as RideAdd } from '../rideAdd/rideAdd';
import { name as RideCreator } from '../rideCreator/rideCreator';
import { name as displayNameFilterForCards } from '../../filters/displayNameFilterForCards';

class RidesList {
  
  constructor($scope, $reactive, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);
    this.perPage = 9;
    this.page = 1;
    this.sort = {
      fromLocation: 1
    };
    this.searchText = '';
    this.type='1';

    this.subscribe('rideSearch', () => [{
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
      }, this.getReactively('searchText')
    ]);

    this.subscribe('users');
    this.subscribe('userData');

    this.helpers({
      rides() {
        return Rides.find({}, {
          sort : this.getReactively('sort')
        });
      },
      ridesCount() {
        return Counts.get('numberOfRides');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }

  noRides(){
    if(this.rides.length==0 && this.searchText.length>0){
      return true;
    }
  }

  isCordova(){
  return Meteor.isCordova;
}

  isOwner(ride) {
    return this.isLoggedIn && ride.owner === this.currentUserId;
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }

  getServiceImageUrl(owner){
         var user = Meteor.users.findOne(owner);
         if (user && user.services && user.services.facebook && user.services.facebook.id){
             return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
         }else{
           return "";
         }
    }
  
  getUser(id){
    return Meteor.users.findOne(id);
  }
}

const name = 'ridesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  RidesSort,
  RidesMap,
  RideAdd,
  RideCreator,
  displayNameFilterForCards,
  'ngMap'
]).component(name, {
  template,
  controllerAs: name,
  controller: RidesList   
})
  .config(config)
  .directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  })

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rides', {
      url: '/rides',
      template: '<rides-list></rides-list>'
    });
}
