import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './sharegaadi.html';
import { name as RidesList } from '../ridesList/ridesList';
import { name as RideDetails } from '../rideDetails/rideDetails';

class Sharegaadi {}

const name = 'sharegaadi';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  RidesList,
  RideDetails,
  'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Sharegaadi
})
  .config(config)
  .run(run);
//   .directive('googleplace', function() {
//     return {
//         require: 'ngModel',
//         scope: {
//             ngModel: '=',
//             details: '=?'
//         },
//         link: function(scope, element, attrs, model) {
//             var options = {
//                 types: [],
//                 componentRestrictions: {}
//             };
//             scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

//             google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
//                 scope.$apply(function() {
//                     scope.details = scope.gPlace.getPlace();
//                     model.$setViewValue(element.val());                
//                 });
//             });
//         }
//     };
// })

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
        $state.go('rides');
      }
    }
  );
}
