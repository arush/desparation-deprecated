'use strict';

/**
 * This is the Socks State Machine that takes the questions that the user has answered 
 * and redirects to the correct question
 */


var SocksStateCtrl = ngMaleApp.controller('SocksStateCtrl', function($scope,StateMachine,DataService,$locale,$location) {

	

	// if(typeof($scope.user.socksAnswers) === "undefined") {
		$location.path('/section/garms/category/socks/question/1');
	// }

});
SocksStateCtrl.$inject = ['$scope','StateMachine'];