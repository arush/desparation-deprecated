var SpecificsFormController = function SpecificsFormController($scope,HelperService,$routeParams,specificsLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;
		$scope.selectedSpecifics = "";
		
	/***** END CONTROLLER PROPERTIES ******/


		// retrieve brand data from service so we can use it below in the buttons
		$scope.question = specificsLoader.getQuestion($routeParams.category,$locale.id);
		$scope.questionTitle = specificsLoader.getQuestionTitle($locale.id);

		// TODO: put these in a .json file and retrieve via AJAX



	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedSpecifics);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/

	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category, "B4.0_Step": "Specifics"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);

}
SpecificsFormController.$inject = ['$scope','HelperService','$routeParams','specificsLoader','$locale'];