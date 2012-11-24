'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','StateMachines','DataServices','QuestionsModule']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
         templateUrl:'start.html',
         controller:MainController
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


