'use strict';

/**
 * This is the nav controller for the application.
 *
 */

var DetailCtrl = ngMaleApp.controller('DetailCtrl', function($scope,StateMachine,DataService,$routeParams) {

 
  
  /**
   *  Controller Properties
   */

   $scope.templateUrl = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';


  /**
   *  Controller Functions
   */

 	StateMachine.answer().answer();
   



});
DetailCtrl.$inject = ['$scope','StateMachine'];