import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './admin.html';
import {
  Feedback
} from '../../../api/feedback';
import {
  UserPost
} from '../../../api/userPosts';


class Admin {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.subscribe('feedbacks');
    this.subscribe('userpost');
    this.helpers({
      feedbacks() {
        return Feedback.find({});
      },
      users() {
        return UserPost.find({});
      }
      });
  }

   deleteFeedback(id){
    Feedback.remove({_id:id}, (error) => {
      if (error) {
        Materialize.toast('Not Succesful in deleting  Feedback. Please try again.', 2000) ;
      } else {
        Materialize.toast('Successfully Deleted  Feedback', 2000) ;
      }
    });
    
  }
}

const name = 'admin';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: Admin
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: template,
      controllerAs: name,
      controller: Admin,
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