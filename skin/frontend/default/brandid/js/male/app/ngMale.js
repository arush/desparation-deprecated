'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['SlideViewDirective','StateMachines','DataServices','ui']);


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


ngMaleApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
         templateUrl:'start.html',
         controller:MainCtrl
      })
      .when('/section/:section/category/socks/', {
      	templateUrl: 'urlRouter.html',
      	controller: SocksStateCtrl
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'urlRouter.html',
         controller: DetailCtrl
      })
      .otherwise({
        redirectTo: '/'
      });
});



// wire up the screens in order

function Boxers1($scope, Navigation) {
    Navigation.backPage = null;
    Navigation.nextPage = '/2';
}
function Boxers2($scope, Navigation) {
    Navigation.backPage = '/1';
    Navigation.nextPage = '/3';
}

function Boxers3($scope, Navigation) {
    Navigation.backPage = '/2';
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
