'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','StateMachines','DataServices','QuestionsModule']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        // redirectTo:'/section/intro'
        // bring this back if we want a pre-intro screen
         templateUrl:'start.html',
         controller:MainController
      })
      .when('/section/intro', {
        // redirectTo:'/section/intro'
        // bring this back if we want a pre-intro screen
         templateUrl:'section/intro.html',
         controller:IntroController
      })
      .when('/section/:section', {
         templateUrl:'sectionProxy.html',
         controller:SectionController
      })
      .when('/section/:section/category/:category/dashboard', {
         templateUrl: 'detailViewProxy.html',
         controller:DashboardController
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:QuestionController
      })
      .otherwise({
        redirectTo: '/'
      });
});
ngMaleApp.$inject = ['ui','StateMAchines','DataServices','QuestionsModule'];


