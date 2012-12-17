var CheckoutFormController = function CheckoutFormController($scope,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/


	// checkout title
	$scope.checkoutTitle = checkoutLoader.getCheckoutTitle($locale.id);

	// checkout copy
	$scope.checkoutCopy = checkoutLoader.getCheckoutCopy($locale.id);

	// gloves image
	$scope.checkoutIncentiveUrl = checkoutLoader.getCheckoutIncentiveUrl($locale.id);

	var environment = HelperService.getEnvironment();
	var liveOrDevUrl;
	console.log(environment);
	
	if(environment === "www") {
		liveOrDevUrl = "brandid";
	} else {
		liveOrDevUrl = "hackbrandid";
	}

	$scope.paymentPageUrl = "https://" + liveOrDevUrl + ".recurly.com/subscribe/onboardfee";


	/**
	*  Controller Functions
	*/

	// track
	HelperService.metrics.trackPage('£1 checkout');

}
CheckoutFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
