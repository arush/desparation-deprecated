'use strict';

/**
 * This is the nav controller for the application.
 *
 */

function DashboardController($scope,$routeParams,questionLoader,$location) {

	/**
	*  Controller Properties
	*/

	if($routeParams.question === "dashboard") {
		$scope.detailTemplate = $routeParams.section+'/'+$routeParams.question+'.html';
	} else /* question === id of question */ {
		// send to dashboard and use routParams to load subview in the dashboard template
		$scope.detailTemplate = $routeParams.section+'/dashboard.html';
	}


	// Fetch the set of questions from the back-end service

	$scope.questions = questionLoader.getQuestions($routeParams.category);

	$scope.routeParams = $routeParams;
	/**
	*  Controller Functions
	*/
	

	$scope.slideToQuestion = function(questionId) {

		$('#dashboard').addClass('fadeOutLeftBig');
		// alert(questionTemplatePath);


		var detailViewRoute = "/section/" + $routeParams.section + "/category/" + $routeParams.category + "/question/" + questionId;

		// setTimeout(function(detailViewRoute) {
			// alert('about to go to:' + detailViewRoute);
			$location.path(detailViewRoute);
		// }, 300);
		
	}

}
DashboardController.$inject = ['$scope','$routeParams','questionLoader','$location'];

function QuestionController($scope,$routeParams,questionLoader) {

	/**
	*  Controller Properties
	*/

	//use the correct template
	$scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	


}
QuestionController.$inject = ['$scope','$routeParams','questionLoader'];


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
