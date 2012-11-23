'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
var MainCtrl = ngMaleApp.controller('MainCtrl', function($scope,StateMachine,DataService,$locale) {

  console.log("statemachine\n" + StateMachine);
  /**
   *  Controller Functions
   */

  $scope.drawerOpen = true;

  $locale.id = "en-gb";

  // TODO: put these in a .json file and retrieve via AJAX

  if ($locale.id == 'en-gb') {
    var catalogItems = [
        {
          category: "boxers",
          cssClass: "boxers",
          name: "pants"
        },
        {
          category: "socks",
          cssClass: "socks",
          name: "socks"
        }
    ];
  } else {
    var catalogItems = [
        {
          category: "boxers",
          cssClass: "boxers",
          name: "pants"
        },
        {
          category: "socks",
          cssClass: "socks",
          name: "socks"
        }
    ];
  }

  $scope.user = {
    firstName: "test",
    lastName: null,
    email: null,
    configuredItems: catalogItems
  };

  $scope.menu = [
    {
      title: "1. Are you a man?",
      section: "manometer"
    },
    {
      title: "2. Your Garms",
      section: "garms",
      submenuTemplate: "menu/catalogItems.html"
    },
    {
      title: "3. Your Life"

    },
    {
      title: "4. Timeline"

    }
  ];


  
  // alert($locale.id);
});
MainCtrl.$inject = ['$scope','DataService','StateMachine'];