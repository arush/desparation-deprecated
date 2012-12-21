var SuccessFormController = function SuccessFormController($scope,DataService,HelperService,$routeParams,$locale,successLoader) {

	/**
	*  Controller Properties
	*/


	// receive the account code from Recurly success form and store it against the user as teh email and the account_code
	if($scope.currentUser) {
		DataService.setToUser($scope.currentUser,"recurly_account_code",$routeParams.account_code);
		// only use the recurly email as the user's email if it was not saved before, e.g. if they blocked access to email when connecting to facebook
		if(!$scope.currentUser.get("email")) {
			DataService.setToUser($scope.currentUser,"email",$routeParams.account_code);
		}
		DataService.saveUser($scope.currentUser);
		console.log($routeParams.account_code);
	}

	// success title
	$scope.successTitle = successLoader.getSuccessTitle($locale.id);

	// success copy
	$scope.successCopy = successLoader.getSuccessCopy($locale.id);

	

	/**
	*  Controller Functions
	*/


	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category, "B4.0_Step": "Success"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);


}
SuccessFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','successLoader'];
