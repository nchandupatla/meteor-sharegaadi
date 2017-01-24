import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './sharegaadi.css';
import template from './sharegaadi.html';
import { name as RidesList } from '../ridesList/ridesList';
import { name as RideDetails } from '../rideDetails/rideDetails';
import { name as UserLogin } from '../userLogin/userLogin';

class Sharegaadi {

constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;
    
    $reactive(this).attach($scope);
    this.subscribe('userData');
    
    this.credentials = {
      email: '',
      password: ''
    };

    this.error = '';

    this.helpers({

       isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      },
       getServiceImageUrl(){
        if (Meteor.user() && Meteor.user().services && Meteor.user().services.facebook)
          return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
      }

    })
  }

 logout() {
    Accounts.logout();
  }
  
openHowItWorksModal(){
    $('#modal1').openModal();
}
closeHowItWorksModal(){
    $('#modal1').closeModal();
}

}

const name = 'sharegaadi';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  RidesList,
  RideDetails,
  'accounts.ui',
  UserLogin
]).component(name, {
  template,
  controllerAs: name,
  controller: Sharegaadi
})
  .config(config)
  .run(run)
  .directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: 'usa'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                var addressComponents = geoComponents.address_components;

                addressComponents = addressComponents.filter(function(component){
                    switch (component.types[0]) {
                        case "locality": // city
                            return true;
                        case "administrative_area_level_1": // state
                            return true;
                        case "country": // country
                            return true;
                        default:
                            return false;
                    }
                }).map(function(obj) {
                    return obj.long_name;
                });

                addressComponents.push(latitude, longitude);

                scope.$apply(function() {
                    scope.details = addressComponents; // array containing each location component
                    model.$setViewValue(element.val());
                });
            });
        }
    };
})

function config($locationProvider, $urlRouterProvider, $qProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/rides');

  $qProvider.errorOnUnhandledRejections(false);
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}
