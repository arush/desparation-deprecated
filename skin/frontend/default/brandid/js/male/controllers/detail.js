'use strict';

/**
 * This is the nav controller for the application.
 *
 */

var DetailCtrl = ngMaleApp.controller('DetailCtrl', function($scope,StateMachine,DataService,$routeParams) {

  /**
   *  Controller Properties
   */
   $scope.toggleDrawer = function() {
   	$scope.drawerOpen = !$scope.drawerOpen;
   }
	/**
	*	This is my fake state machine to dynamically ng-include different template files
	*
	*/ 

	// if there is no question, go to dashboard
	alert("detail view");
	
		$scope.templateUrl = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';


  /**
   *  Controller Functions
   */   



});
DetailCtrl.$inject = ['$scope','StateMachine'];