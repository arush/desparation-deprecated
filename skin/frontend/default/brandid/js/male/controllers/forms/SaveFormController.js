var SaveFormController = function SaveFormController($scope,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/


	// summary title
	$scope.checkoutSummaryTitle = checkoutLoader.getCheckoutSummaryTitle($locale.id);

	// basket
	$scope.basket = checkoutLoader.getBasket($routeParams.category, $scope.male_answers);

	// make human readable answers, we made this non-default because the raw basket can be used
	if(typeof($scope.basket.brands) !== "undefined") {
		$scope.basket.brands = checkoutLoader.humanizeAnswer($scope.basket.brands);
	};
	
	if(typeof($scope.basket.colours) !== "undefined") {
		$scope.basket.colours = checkoutLoader.humanizeAnswer($scope.basket.colours);
	};
	
	if(typeof($scope.basket.size) !== "undefined") {
		$scope.basket.size = checkoutLoader.humanizeSize($scope.basket.size);
	};


	// close the drawer
	$scope.drawerOpen = !$scope.drawerOpen;
	

	/**
	*  Controller Functions
	*/

	$scope.fbLoginAndSave = function() {

		DataService.fbLoginAndSave($scope.male_answers, $routeParams.category, $scope.currentUser, /* save is needed */ true);
	}


	// track
	HelperService.metrics.trackPage('save basket');


}
SaveFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
