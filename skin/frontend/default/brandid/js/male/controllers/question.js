function QuestionController($scope,$routeParams,questionLoader,brandsLoader,$location) {

	/**
	*  Controller Properties
	*/

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

	// set the chosen item if navigated to this url without the onboarding process



	// TODO: figure out exchange rate functionality


	// Fetch the set of questions from the back-end service

	// $scope.questions = questionLoader.getQuestions($routeParams.category);

	var valueBrands = brandsLoader.getValueBrands($routeParams.category);
	var premiumBrands = brandsLoader.getPremiumBrands($routeParams.category);



	$scope.valuePriceLower = valueBrands.priceRange.lower;
	$scope.valuePriceUpper = valueBrands.priceRange.upper;

	

	// add all the brands retrieved from the service to the $scope.brands object
	
	// this has to be done by doing a deep copy - copying objects is a javascript limitation
	$scope.brands = JSON.parse(JSON.stringify(valueBrands.brands));

	angular.forEach(premiumBrands.brands, function(premiumBrand) {
		var copyOfPremiumBrand = JSON.parse(JSON.stringify(premiumBrand));
		$scope.brands.push(copyOfPremiumBrand);
	});

	$scope.selectedBrands = [];


	/**
	*  Controller Functions
	*/

	$scope.chooseValueBrands = function() {
		$scope.selectedBrands = JSON.parse(JSON.stringify(valueBrands.brands));
	}


}
QuestionController.$inject = ['$scope','$routeParams','questionLoader','brandsLoader','$location'];