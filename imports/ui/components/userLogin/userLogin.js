import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './userLogin.html';


class UserLogin {
  constructor($stateParams, $scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);
    this.$state = $state;
    if(Meteor.user()){
      this.$state.go('rides');
    }else{
      console.log('not logged in');
    }
  }

    facebookLogin() {
    Meteor.loginWithFacebook({
      loginStyle:"redirect"
    }, this.$bindToContext((error) => {
      if (error) {
        console.log(error); //If there is any error, will get error here
      } else {
        console.log(Meteor.user());// If there is successful login, you will get login details here
        this.$state.go('rides');
      }
      })
    );
  }
}

const name = 'userLogin';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: UserLogin
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: template,
      controllerAs: name,
      controller: UserLogin,
    });
}
