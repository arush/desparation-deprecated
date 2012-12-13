'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','StateMachines','DataServices','QuestionsModule','BrandsModule']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo:'/section/garms/category/intro',
        // bring this back if we want a pre-intro screen
         // templateUrl:'start.html',
         controller:MainController
      })
      .when('/register', {
         templateUrl:'register.html',
         controller:MainController
      })
      .when('/section/:section/category/:category', {
        // redirectTo:'/section/intro'
        // bring this back if we want a pre-intro screen
         templateUrl:'categoryProxy.html',
         controller:CategoryController
      })
      // .when('/section/:section', {
      //    templateUrl:'sectionProxy.html',
      //    controller:SectionController
      // })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:QuestionController
      })
      .otherwise({
        redirectTo: '/section/garms/category/intro'
      });
});
ngMaleApp.$inject = ['ui','StateMAchines','DataServices','QuestionsModule','BrandsModule'];


