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
         controller: DetailCtrl
      })
      .otherwise({
        redirectTo: '/'
      });
});

function DetailCtrl($scope, $routeParams) {
  $scope.templateUrl = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
}