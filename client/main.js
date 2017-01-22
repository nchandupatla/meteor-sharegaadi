import angular from 'angular';
import 'materialize-css/dist/css/materialize.min.css'
import { Meteor } from 'meteor/meteor';

import { name as Sharegaadi } from '../imports/ui/components/sharegaadi/sharegaadi';

function onReady() {
  angular.bootstrap(document, [
    Sharegaadi
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
