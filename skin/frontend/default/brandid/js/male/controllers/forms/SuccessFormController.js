var SuccessFormController = function SuccessFormController($scope,DataService,$routeParams,$locale,successLoader) {

	/**
	*  Controller Properties
	*/


	// receive the account code from Recurly success form and store it against the user as teh email and the account_code
	DataService.setToUser($scope.currentUser,"account_code",$routeParams.account_code);
	
	// only use the recurly email as the user's email if it was not saved before, e.g. if they blocked access to email when connecting to facebook
	if(!$scope.currentUser.get("email")) {
		DataService.setToUser($scope.currentUser,"email",$routeParams.account_code);
	}
	
	DataService.saveUser($scope.currentUser);

	// success title
	$scope.successTitle = successLoader.getSuccessTitle($locale.id);

	// success copy
	$scope.successCopy = successLoader.getSuccessCopy($locale.id);

	

	/**
	*  Controller Functions
	*/


	// track
	HelperService.metrics.trackPage('Registered credit card');


}
SuccessFormController.$inject = ['$scope','DataService','$routeParams','$locale','successLoader'];
