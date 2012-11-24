'use strict';

/**
 * This is the nav controller for the application.
 *
 */

function DetailController($scope,$routeParams,questionLoader) {

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

	if($routeParams.question === "dashboard") {
		$scope.detailTemplate = $routeParams.section+'/'+$routeParams.question+'.html';
	} else {
		$scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	}


	// Fetch the set of questions from the back-end service
	  $scope.questions = questionLoader.getQuestions($routeParams.category);

	

}
DetailController.$inject = ['$scope','$routeParams','questionLoader'];


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
DetailControlsController.$inject = ['$scope','StateMachine','DataService','$routeParams'];
