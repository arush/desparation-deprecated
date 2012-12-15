function ColoursFormController($scope,$routeParams,coloursLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;
		$scope.colourButtons = [];
		$scope.selectedColours = [];

	/***** END CONTROLLER PROPERTIES ******/


		// retrieve colour data from service so we can use them as tags
		// var coloursFromLoader = coloursLoader.getColours($routeParams.category,$locale.id);
		// need to send a stringified version for it to work with SELECT2
		// $scope.discoColours = coloursFromLoader;

		$scope.discoColours = coloursLoader.getDiscoColoursAll($locale.id);
		$scope.classicColours = coloursLoader.getClassicColoursAll($locale.id);

		$scope.question = coloursLoader.getQuestion($locale.id);
		$scope.questionTitle = coloursLoader.getQuestionTitle($locale.id);



		// TODO: put these in a .json file and retrieve via AJAX

		if ($locale.id === 'en-gb') {

			$scope.coloursButtons = [
				{
					style: "classic",
					label: "Classic",
					isActive: false,
					colours: coloursLoader.getClassicColoursAll($locale.id)
				},
				{
					style: "disco",
					label: "Disco",
					isActive: false,
					colours: coloursLoader.getDiscoColoursAll($locale.id)
				}
			];
			

		} else {
			// another language
		}

		// this is for skinning the buttons
		$scope.totalNumButtons = $scope.coloursButtons.length;

	/***** END COLOURS PRE-POPULATE BUTTONS ******/


	/***** SELECT2 COLOURS DROPDOWN ******/

		// make an array of all the colours for SELECT2
		$scope.colours = $scope.classicColours;

		angular.forEach($scope.discoColours, function(discoColour) {

			$scope.colours.push(discoColour);
		});

		
		

	/***** SELECT2 COLOURS DROPDOWN ******/


	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.chooseColours = function(coloursType, buttonIndex) {

			angular.forEach($scope.coloursButtons, function(button) {
				button.isActive = false;
			});

			$scope.coloursButtons[buttonIndex].isActive = true;

			$scope.selectedColours = [];
			$scope.selectedColours = coloursLoader.getAllColoursFilteredBy(coloursType,$locale.id);
		};

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedColours);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/


}
ColoursFormController.$inject = ['$scope','$routeParams','coloursLoader','$locale'];