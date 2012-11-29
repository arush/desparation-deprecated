'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
var MainController = ngMaleApp.controller('MainController', function($scope,StateMachine,DataService,$locale,$routeParams) {

  // console.log("statemachine\n" + StateMachine);
  /**
   *  Controller Functions
   */


  // this is so the menu can access current url parameters and highlight the current menu selection
  $scope.routeParams = $routeParams;

  $scope.drawerOpen = false;

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
      title: "1. Hi, I'm M.A.L.E.",
      section: "intro",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        category: "gender",
        cssClass: "gender",
        name: "gender"
      }]
    },
    {
      title: "2. Your Underwear",
      section: "garms",
      submenuTemplate: "menu/catalogItems.html"
    },
    {
      title: "3. Your Life",
      section: "extras",

    }
  ];


  
  // alert($locale.id);
});
MainController.$inject = ['$scope','StateMachine','DataService','$locale','$routeParams'];