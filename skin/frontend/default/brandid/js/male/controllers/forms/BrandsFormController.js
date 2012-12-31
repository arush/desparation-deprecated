var BrandsFormController = function BrandsFormController($scope,HelperService,$routeParams,brandsLoader,$locale) {


	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;

		$scope.assets = {
			typeahead: {
				allBrands: [],
				typeaheadValue:""
			},
			selectedTags: {},
			allBrands: []
		};
		

		// selectedTags should be replaced with user's actual stored data (currentAnswer)

		$scope.assets.selectedTags = [
		];


	/***** END CONTROLLER PROPERTIES ******/


		$scope.questionTitle = brandsLoader.getQuestionTitle($locale.id);
		$scope.question = brandsLoader.getQuestion($locale.id);
		$scope.tooltip = brandsLoader.getTooltip($locale.id);
		$scope.suggestionsTitle = brandsLoader.getSuggestionsTitle($locale.id);
		$scope.myTagsTitle = brandsLoader.getMyTagsTitle($routeParams.category,$locale.id);


		// make data tag friendly and create a typeahead array
		var brandsData = brandsLoader.getBrands($routeParams.category,$locale.id);
		
		var brandsList = brandsLoader.detag(brandsData);

		// set pre-selected brands
		brandsLoader.setSelected(brandsData, $scope.assets.selectedTags);


		$scope.assets.typeahead.allBrands = brandsList;


		$scope.assets.allBrands = brandsData;


		
	/***** END BRANDS PRE-POPULATE BUTTONS ******/


	/***** TYPEAHEAD ******/

	$scope.toggleTag = function(senderId) {
		
		brandsLoader.toggleSelect($scope.assets.allBrands, senderId);


		var found = false;


		// search for and remove it
		for(var i = 0; i < $scope.assets.selectedTags.length; i++){
			if($scope.assets.selectedTags[i].id === senderId) {
				
				found = true;
				
				$scope.assets.selectedTags.splice(i,1);
					
				break;
			}

		}

		// add it if it wasn't there already
		if(!found) {


			var tagToAdd = {
				id: senderId,
				isSelected:true,
				text: senderId
			}

			$scope.assets.selectedTags.push(tagToAdd);

		}
		// search selected brands, if exists, add, if not, remove

	}

		

		$scope.typeTag = function() {
	      var senderId = $scope.assets.typeahead.typeaheadValue;

	      // select brand if not already selected
		  for(var i=0; i < $scope.assets.selectedTags.length; i++) {
			if(senderId === $scope.assets.selectedTags[i].text) {

				// brand already is selected, so break out of the function
				$scope.assets.typeahead.typeaheadValue = "";
				return;
			}
		  };

	      var tagToAdd = [senderId,""]; // hack to make it an array of strings so we can send it to taggerize() down below

	      if(senderId !== "") {

	      	// create tag-friendly array
	      	tagToAdd = brandsLoader.taggerize(tagToAdd);

	      	tagToAdd[0].isSelected = true;



	      	$scope.assets.selectedTags.push(tagToAdd[0]);
			
	      	// update in allBrands list
			brandsLoader.toggleSelect($scope.assets.allBrands, senderId);

	      	$scope.assets.typeahead.typeaheadValue = "";

	      }
	      
	    };
	
	/***** CONTROLLER EVENT RESPONDERS ******/
	

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference

			// humanize answers
			var answers = brandsLoader.detag(angular.copy($scope.assets.selectedTags));

			// call parent
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,answers);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/


	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category,"B4.0_Step": "Brands"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);

}
BrandsFormController.$inject = ['$scope','HelperService','$routeParams','brandsLoader','$locale'];
