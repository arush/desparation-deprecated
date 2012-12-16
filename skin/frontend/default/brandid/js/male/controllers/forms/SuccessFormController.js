var SuccessFormController = function SuccessFormController($scope,DataService,$routeParams,$locale,successLoader) {

	/**
	*  Controller Properties
	*/


	// receive the account code from Recurly success form and store it against the user as teh email and the account_code
	DataService.setToUser($scope.currentUser,"account_code",$routeParams.account_code);
	DataService.setToUser($scope.currentUser,"email",$routeParams.account_code);
	DataService.saveUser($scope.currentUser);

	// success title
	$scope.successTitle = successLoader.getSuccessTitle($locale.id);

	// success copy
	$scope.successCopy = successLoader.getSuccessCopy($locale.id);

	

	/**
	*  Controller Functions
	*/


}
SuccessFormController.$inject = ['$scope','DataService','$routeParams','$locale','successLoader'];
