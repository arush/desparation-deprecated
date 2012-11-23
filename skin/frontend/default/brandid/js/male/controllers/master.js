'use strict';

var MasterCtrl = ngMaleApp.controller('MasterCtrl', function($scope,DataService,$locale, $routeParams) {

	// this is so the menu can access current url parameters and highlight the current menu selection
	$scope.routeParams = $routeParams;

});