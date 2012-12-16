var CheckoutFormController = function CheckoutFormController($scope,DataService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/


	// checkout title
	$scope.checkoutTitle = checkoutLoader.getCheckoutTitle($locale.id);

	// checkout copy
	$scope.checkoutCopy = checkoutLoader.getCheckoutCopy($locale.id);

	// gloves image
	$scope.checkoutIncentiveUrl = checkoutLoader.getCheckoutIncentiveUrl($locale.id);

	var liveOrDevUrl = "hackbrandid";

	if($scope.live) {
		liveOrDevUrl = "brandid";
	}

	$scope.paymentPageUrl = "https://" + liveOrDevUrl + ".recurly.com/subscribe/onboardfee";


	/**
	*  Controller Functions
	*/


}
CheckoutFormController.$inject = ['$scope','DataService','$routeParams','$locale','checkoutLoader'];
