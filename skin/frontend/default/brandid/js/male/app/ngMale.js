'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['StateMachines','DataServices','ui']);

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
         templateUrl:'start.html',
         controller:MainCtrl
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:DetailController
      })
      .otherwise({
        redirectTo: '/'
      });
});