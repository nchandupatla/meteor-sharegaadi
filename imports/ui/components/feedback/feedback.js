import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './feedback.html';
import {
  Feedback
} from '../../../api/feedback';


class FeedbackForm {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
     this.form = {};
  
  } 
  
  submit() {
      Feedback.insert(this.form);
      this.form={};
      Materialize.toast('Thank you for the feedback', 4000);
  }


}

const name = 'feedback';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: FeedbackForm
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('feedback', {
      url: '/feedback',
      template: template,
      controllerAs: name,
      controller: FeedbackForm
    });
}