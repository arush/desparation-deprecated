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
		var newLocation = '#/section/' + $routeParams.section + '/category/generic/question/success';
		window.location = newLocation;
	};

	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category, "B4.0_Step": "£1 Checkout"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);

}
CheckoutFormController.$inject = ['$scope','$location','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
