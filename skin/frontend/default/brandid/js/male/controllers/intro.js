function IntroController($scope,$routeParams,questionLoader) {

	/**
	*  Controller Properties
	*/

	//use the correct template
	// $scope.sectionTemplate = 'section/' + $routeParams.section + '.html';
	$scope.routeParams.section = 'intro';

}
IntroController.$inject = ['$scope','$routeParams','questionLoader'];