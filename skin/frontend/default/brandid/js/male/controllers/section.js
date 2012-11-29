function SectionController($scope,DataService,$routeParams) {

	/**
	*  Controller Properties
	*/

	/**
	*  Controller Functions
	*/

 //    $scope.detailTemplate = $routeParams.section+'/'+$routeParams.category+'/'+$routeParams.question+'.html';
	// console.log($routeParams);
	// console.log($scope.detailTemplate);
	// $scope.templateUrl = 'garms/boxers/dashboard.html';
	// alert($scope.templateUrl);

	$scope.sectionTemplate = 'section/' + $routeParams.section + '.html';
}
SectionController.$inject = ['$scope','DataService','$routeParams'];
