var SaveFormController = function SaveFormController($scope,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/


	// summary title
	$scope.saveTitle = checkoutLoader.getSaveTitle($locale.id);
	$scope.question = checkoutLoader.getSaveCopy($locale.id);
	$scope.facebookReasons = checkoutLoader.getFacebookConnectReasons($locale.id);

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
