function CheckoutController($scope,DataService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/

	
	$scope.checkoutTitle = checkoutLoader.getCheckoutTitle($locale.id);

	$scope.checkoutCopy = checkoutLoader.getCheckoutCopy($locale.id);

	$scope.checkoutIncentiveUrl = checkoutLoader.getCheckoutIncentiveUrl($locale.id);


	$scope.checkoutSummaryTitle = checkoutLoader.getCheckoutSummaryTitle($locale.id);


	$scope.basket = {
		item: $routeParams.category,
		brands: $scope.male_answers[$routeParams.category].brands,
		size: $scope.male_answers[$routeParams.category].size,
		colours: $scope.male_answers[$routeParams.category].colours,
		specifics: $scope.male_answers[$routeParams.category].specifics
	}


	/**
	*  Controller Functions
	*/


}
CheckoutController.$inject = ['$scope','DataService','$routeParams','$locale','checkoutLoader'];
