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