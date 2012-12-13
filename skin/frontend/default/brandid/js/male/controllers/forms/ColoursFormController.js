function ColoursFormController($scope,$routeParams,coloursLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;

	/***** END CONTROLLER PROPERTIES ******/


		// retrieve colour data from service so we can use them as tags
		// var coloursFromLoader = coloursLoader.getColours($routeParams.category,$locale.id);
		// need to send a stringified version for it to work with SELECT2
		// $scope.discoColours = coloursFromLoader;

		$scope.discoColours = coloursLoader.getDiscoColoursAll($locale.id);
		$scope.classicColours = coloursLoader.getClassicColoursAll($locale.id);

		$scope.colours = $scope.classicColours;

		angular.forEach($scope.discoColours, function(discoColour) {

			$scope.colours.push(discoColour);
		});


		// TODO: put these in a .json file and retrieve via AJAX

		if ($locale.id === 'en-gb') {

			$scope.coloursQuestion = "Disco or classic, spots or stripes, patterned or graphic, or just plain old plain? We’ve got the full spectrum buddy. And if we show you any colours you’d never wear, ever. Just hit delete.";

			// Fetch the set of answers

			$scope.typeColoursTooltip = "";

			

		} else {
			// another language
		}

	/***** END COLOURS PRE-POPULATE BUTTONS ******/


	/***** SELECT2 COLOURS DROPDOWN ******/

		
		$scope.selectedColours = [];

	/***** SELECT2 COLOURS DROPDOWN ******/


	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.chooseColours = function(category,coloursType) {
			$scope.selectedColours = coloursLoader.getAllColoursFilteredBy(category,coloursType);
		};

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedColours);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/


}
ColoursFormController.$inject = ['$scope','$routeParams','coloursLoader','$locale'];