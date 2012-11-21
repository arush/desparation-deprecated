'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
var MainCtrl = ngMaleApp.controller('MainCtrl', function($scope,DataService) {

  /**
   *  Controller Functions
   */
   $scope.user = {
      firstName: null,
      lastName: null,
      email: null
    };
  alert($scope.user.firstName);
});
MainCtrl.$inject = ['$scope','DataService'];