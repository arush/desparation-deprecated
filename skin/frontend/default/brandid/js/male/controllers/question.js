function QuestionController($scope,$routeParams,questionLoader) {

	/**
	*  Controller Properties
	*/

	//use the correct template
	$scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	


}
QuestionController.$inject = ['$scope','$routeParams','questionLoader'];