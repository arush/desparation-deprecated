'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
var MainCtrl = ngMaleApp.controller('MainCtrl', function($scope,StateMachine,DataService,$locale) {

  console.log(StateMachine);
  /**
   *  Controller Functions
   */
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

  $scope.menu = [
    {
      title: "1. Are you a man?",
      section: "manometer",
    },
    {
      title: "2. Your Garms",
      section: "garms",
      subItems: catalogItems

    },
    {
      title: "3. Your Life",

    },
    {
      title: "4. ",

    }
  ];



  $scope.user = {
    firstName: null,
    lastName: null,
    email: null
  };
  // alert($locale.id);
});
MainCtrl.$inject = ['$scope','DataService','StateMachine'];