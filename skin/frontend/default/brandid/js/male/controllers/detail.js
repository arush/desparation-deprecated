'use strict';

/**
 * This is the nav controller for the application.
 *
 */

function DetailController($scope,StateMachine,DataService,$routeParams) {

	/**
	*  Controller Properties
	*/

	/**
	*  Controller Functions
	*/

 //    $scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	// console.log($routeParams);
	// console.log($scope.detailTemplate);
	// $scope.templateUrl = 'garms/boxers/dashboard.html';
	// alert($scope.templateUrl);

	$scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
}

function DetailControlsController($scope,StateMachine,DataService,$routeParams) {

	/**
	*  Controller Properties
	*/

	/**
	*  Controller Functions
	*/

 //    $scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	// console.log($routeParams);
	// console.log($scope.detailTemplate);
	// $scope.templateUrl = 'garms/boxers/dashboard.html';
	// alert($scope.templateUrl);

	// $scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
}