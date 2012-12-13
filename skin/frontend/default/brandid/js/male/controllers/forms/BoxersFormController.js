function BoxersFormController($scope,$routeParams,brandsLoader,$locale) {

	/***** CONTROLLER PROPERTIES ******/

		$scope.routeParams = $routeParams;


	/***** END CONTROLLER PROPERTIES ******/


		// retrieve brand data from service so we can use it below in the buttons
		var valueBrands = brandsLoader.getValueBrands($routeParams.category);
		var premiumBrands = brandsLoader.getPremiumBrands($routeParams.category);
		var skateBrands = brandsLoader.getSkateBrands($routeParams.category);

		// TODO: put these in a .json file and retrieve via AJAX

		if ($locale.id === 'en-gb') {

			$scope.brandsQuestion = "What brands do you want? Hint: You can type in your favourite brand and we guarantee we will find it for you";

			// Fetch the set of answers

			$scope.typeBrandsTooltip = "Tag your brands here. If it's not listed, create it and we'll get it for you. 100% guaranteed.";

			$scope.brandsButtons = [
				{
					brandType: 'value',
					label: 'Value Brands',
					priceLower: valueBrands.priceRange.lower,
					priceUpper: valueBrands.priceRange.upper
				},
				{
					brandType: 'premium',
					label: 'Premium Brands',
					priceLower: premiumBrands.priceRange.lower,
					priceUpper: premiumBrands.priceRange.upper
				},
				{
					brandType: 'skate',
					label: 'Skate / Snow',
					priceLower: skateBrands.priceRange.lower,
					priceUpper: skateBrands.priceRange.upper
				},

			];

		} else {
			// another language
		}

	/***** END BRANDS PRE-POPULATE BUTTONS ******/


	/***** SELECT2 BRANDS DROPDOWN ******/

		// add all the brands retrieved from the service to the $scope.brands object
		
		// this has to be done by doing a deep copy - copying objects is a javascript limitation
		$scope.brands = JSON.parse(JSON.stringify(valueBrands.brands));

		angular.forEach(premiumBrands.brands, function(premiumBrand) {
			var copyOfPremiumBrand = JSON.parse(JSON.stringify(premiumBrand));
			$scope.brands.push(copyOfPremiumBrand);
		});

		// TODO: do not add skate brands to $scope.brands if skate brands do not apply to this category
		angular.forEach(skateBrands.brands, function(skateBrand) {
			var copyOfSkateBrand = JSON.parse(JSON.stringify(skateBrand));
			$scope.brands.push(copyOfSkateBrand);
		});

		$scope.selectedBrands = [];

	/***** SELECT2 BRANDS DROPDOWN ******/


	/***** CONTROLLER EVENT RESPONDERS ******/
	
		$scope.chooseBrands = function(category,brandType) {
			$scope.selectedBrands = brandsLoader.getAllBrandsFilteredBy(category,brandType);
		};

		$scope.saveAnswer = function() {
			// since we defined the answer in the question in the form controller, the parent controller doesn't have access to it
			// therefore we need to pass the answer by reference
			$scope.goToNextQuestion($routeParams.section,$routeParams.category,$routeParams.question,/*answer*/$scope.selectedBrands);
		}

	/***** END CONTROLLER EVENT RESPONDERS ******/


}
BoxersFormController.$inject = ['$scope','$routeParams','brandsLoader','$locale'];