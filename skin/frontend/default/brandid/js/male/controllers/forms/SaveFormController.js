var SaveFormController = function SaveFormController($scope,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/


	// summary title
	$scope.saveTitle = checkoutLoader.getSaveTitle($locale.id);
	$scope.question = checkoutLoader.getSaveCopy($locale.id);
	$scope.facebookReasons = checkoutLoader.getFacebookConnectReasons($locale.id);
	$scope.emailImage = checkoutLoader.getEmailImageUrl($locale.id);
	$scope.facebookSubtitle = checkoutLoader.getFacebookSubtitle($locale.id);

	// close the drawer
	$scope.drawerOpen = !$scope.drawerOpen;
	

	/**
	*  Controller Functions
	*/

	$scope.fbLoginAndSave = function() {

		$scope.fbRegisterAndSave();

	}

	// track
	var metricsPayload = {"B4.1_Funnel": $routeParams.category, "B4.1_Step": "Register (Save Basket)"};
    HelperService.metrics.track('B4.1_Reached Funnel Step', metricsPayload);


}
SaveFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
