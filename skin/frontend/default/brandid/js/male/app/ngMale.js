'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','StateMachines','DataServices','QuestionsModule']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
         templateUrl:'start.html',
         controller:MainController
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:DetailController
      })
      .otherwise({
        redirectTo: '/'
      });
});
ngMaleApp.$inject = ['ui','StateMAchines','DataServices','QuestionsModule'];


