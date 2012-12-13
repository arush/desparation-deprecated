function SizeFormController($scope,$routeParams,sizeLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;
		$locale.id = "en-gb";

	/***** END CONTROLLER PROPERTIES ******/
		

		// retrieve brand data from service so we can use it below in the buttons
		var sizeData = sizeLoader.getSizes($routeParams.category,$locale.id);

		$scope.howToMeasure = sizeData.instructions;

		$scope.sizeButtons = sizeData.sizeChoices;

		// TODO: put these in a .json file and retrieve via AJAX

		if ($locale.id === 'en-gb') {

			$scope.sizeQuestion = "Are you a big ‘un or a little ‘un? Whatever, we’ve got you covered. Just click the correct box and we’ll make sure it fits. ";


		} else {
			// another language
		}

	/***** END SIZE PRE-POPULATE BUTTONS ******/


	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.chooseSize = function(category,brandType) {
			// $scope.selectedSize = sizeLoader.getAllSizeFilteredBy(category,brandType);
		};

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedSize);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/


}
SizeFormController.$inject = ['$scope','$routeParams','sizeLoader','$locale'];