'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['SlideViewDirective','DataServices','ui']);


  // .config(['$routeProvider', function($routeProvider) {
  //   $routeProvider
  //     .when('/one', {
  //        templateUrl:'view1.html',
  //        controller:Ctrl1
  //     })
  //    .when('/two', {
  //       controller:Ctrl2,
  //       templateUrl:'view2.html'
  //     })
  //     .otherwise({
  //       redirectTo:'/one'
  //     });

  //     // .when('/one', {
  //     //   templateUrl: 'view1.html',
  //     //   controller: Ctrl1
  //     // });
  // }]);

function Ctrl1($scope) {
    $scope.message = "one!";
}
function Ctrl2($scope) {
    $scope.message = "two!";
}

ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
         templateUrl:'start.html',
         controller:MainCtrl
      })
      .when('/one', {
         templateUrl:'view1.html',
         controller:Ctrl1
      })
     .when('/two', {
        controller:Ctrl2,
        templateUrl:'view2.html'
      })
     .when('/three', {
        controller:Ctrl3,
        templateUrl:'view3.html'
      })
      .otherwise({
        redirectTo:'/one'
      });
});

function Ctrl1($scope, Navigation) {
    Navigation.backPage = null;
    Navigation.nextPage = '/two';
}
function Ctrl2($scope, Navigation) {
    Navigation.backPage = '/one';
    Navigation.nextPage = '/three';
}

function Ctrl3($scope, Navigation) {
    Navigation.backPage = '/two';
    Navigation.nextPage = null;
}


ngMaleApp.service('Navigation', function($location) {
  return {
  	transition: 'backwardTransition',
		backPage: null,
    nextPage: null,
		back: function() {
			this.transition = 'backwardTransition';
			$location.path(this.backPage);
		},
		next: function() {
			this.transition = 'forwardTransition';
			$location.path(this.nextPage);
		}
	}
})
