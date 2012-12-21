var SizeFormController = function SizeFormController($scope,HelperService,$routeParams,sizeLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;
		$locale.id = "en-gb";
		$scope.totalNumButtons = 5;
		$scope.selectedSize = {};

	/***** END CONTROLLER PROPERTIES ******/
		

		// retrieve brand data from service so we can use it below in the buttons
		var sizeData = sizeLoader.getSizes($routeParams.category,$locale.id);

		$scope.question = sizeLoader.getQuestion($locale.id);
		$scope.questionTitle = sizeLoader.getQuestionTitle($locale.id);

		$scope.howToMeasure = sizeData.instructions;

		$scope.sizeButtons = sizeData.sizeChoices;

		// this is for figuring out the width of the buttons
		$scope.totalNumButtons = $scope.sizeButtons.length;



	/***** END SIZE PRE-POPULATE BUTTONS ******/


	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.chooseSize = function(category,style,buttonIndex) {
			// we'll need category eventually to do a funny comment like "massive feet means..."
			angular.forEach($scope.sizeButtons, function(button) {
				button.isActive = false;
			});

			$scope.sizeButtons[buttonIndex].isActive = true;
			$scope.selectedSize = {
				size: $scope.sizeButtons[buttonIndex].label,
				measurements: $scope.sizeButtons[buttonIndex].measurements
			};

		};

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedSize);
		};

	/***** END CONTROLLER EVENT RESPONDERS ******/

	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category, "B4.0_Step": "Size"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);


}
SizeFormController.$inject = ['$scope','HelperService','$routeParams','sizeLoader','$locale'];