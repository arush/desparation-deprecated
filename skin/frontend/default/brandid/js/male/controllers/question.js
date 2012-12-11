function QuestionController($scope,$routeParams,questionLoader,brandsLoader,$location,$locale) {

	
	/***** CONTROLLER PROPERTIES ******/


		// TODO: figure out exchange rate functionality

		$scope.currencySymbol = "£";
		$scope.routeParams = $routeParams;
		$locale.id = "en-gb";

	/***** END CONTROLLER PROPERTIES ******/


	/***** FINALISE ROUTING & TEMPLATES *****/

		// assuming url begins at /section/garms/category/:category/start

		var questionDecider = '';

		switch($routeParams.question) {
			case 'start':
				questionDecider = 'brands';
				$routeParams.question = 'brands';
				break;
			case 'brands':
				questionDecider = 'brands';
				break;
			default:
				// or dashboard
				questionDecider = 'start';
				break;
		}
		
		$scope.detailTemplate = 'section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/' + questionDecider + '.html';

	/***** FINALISE ROUTING & TEMPLATES *****/


	/***** BRANDS PRE-POPULATE BUTTONS ******/


		// retrieve brand data from service so we can use it below in the buttons
		var valueBrands = brandsLoader.getValueBrands($routeParams.category);
		var premiumBrands = brandsLoader.getPremiumBrands($routeParams.category);
		var skateBrands = brandsLoader.getSkateBrands($routeParams.category);

		// TODO: put these in a .json file and retrieve via AJAX

		if ($locale.id === 'en-gb') {

			$scope.brandsQuestion = "What brands do you want? Hint: You can type in your favourite brand and we guarantee we will find it for you";

			// Fetch the set of answers


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

	/**
	*  Controller Functions
	*/

	$scope.chooseBrands = function(category,brandType) {
		$scope.selectedBrands = brandsLoader.getAllBrandsFilteredBy(category,brandType);
	};

}
QuestionController.$inject = ['$scope','$routeParams','questionLoader','brandsLoader','$location','$locale'];