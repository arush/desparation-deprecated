var CheckoutFormController = function CheckoutFormController($scope,$location,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/

	


	// set up Recurlyjs inputs

	if(typeof $scope.currentUser.get("recurlyAccountCode") !== "undefined") {
		var accountCode = $scope.currentUser.get("recurlyAccountCode");
	} else {
		var accountCode = $scope.currentUser.get("email");
	};

	$scope.recurlyPayload = {
		user 				: $scope.currentUser,
		transactionType		: "billing",
		currency			: "GBP",
		subdomain			: "hackbrandid",
		params : { // these are the params to sign
			account : {
				account_code: accountCode
			}
			// transaction : {
			// 	"amount_in_cents" : 1999,
			// 	"currency":"GBP"
			// }
		}
		
	};

	

	// checkout title
	$scope.checkoutTitle = checkoutLoader.getCheckoutTitle($locale.id);

	// checkout copy
	$scope.checkoutCopy = checkoutLoader.getCheckoutCopy($locale.id);

	// gloves image
	$scope.checkoutIncentiveUrl = checkoutLoader.getCheckoutIncentiveUrl($locale.id);


	/**
	*  Controller Functions
	*/

	$scope.receiveRecurlyToken = function(recurly_token) {
		
		// update user with recurly data from Parse (data gets pushed to Parse from recurly automatically during payment)
		DataService.fetchUser($scope.currentUser, $scope);

		var newLocation = '#/section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/success';

		// track
		var metricsPayload = {'B4.1_Funnel': $routeParams.category};
	    HelperService.metrics.track('Registered Credit Card', metricsPayload);
	    // TODO: add intercom

	    window.location = newLocation;

	};

	// track
	var metricsPayload = {'B4.1_Funnel': $routeParams.category};
    HelperService.metrics.track('Reached Checkout Funnel Step', metricsPayload);

}
CheckoutFormController.$inject = ['$scope','$location','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
