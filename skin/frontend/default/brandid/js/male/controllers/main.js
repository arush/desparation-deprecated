'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
function MainController($scope,StateMachine,DataService,$locale,$routeParams) {

  // console.log("statemachine\n" + StateMachine);
  /**
   *  Controller Functions
   */


  // this is so the menu can access current url parameters and highlight the current menu selection
  $scope.routeParams = $routeParams;

  // select the correct option in the menu
  $scope.$on('$routeChangeSuccess', function(scope, next, current){
      
      // this matches against the cssClass in ng-class
      if(next.params.category === 'intro') {
        $scope.selectedSubmenuItem = 'intro';
      } else {
        // for all other cases, select the question 
        $scope.selectedSubmenuItem = next.params.question;
      }
  });


  $scope.drawerOpen = false;

  $locale.id = "en-gb";

  // TODO: put these in a .json file and retrieve via AJAX

  if ($locale.id == 'en-gb') {
    
    var catalogItems = [
        // {
        //   path: "#/section/garms/category/boxers/outsource",
        //   category: "boxers",
        //   cssClass: "boxers",
        //   label: "pants"
        // },
        // {
        //   path: "#/section/garms/category/socks/outsource",
        //   category: "socks",
        //   cssClass: "socks",
        //   label: "socks"
        // }
    ];
  } else {
    // another language
    // another currency
  }

  $scope.user = {
    firstName: "test",
    lastName: null,
    email: null,
  };


  $scope.menu = [
    {
      title: "1. Choose an item",
      section: "intro",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        link: "#/section/garms/category/intro",
        path: "/section/garms/category/intro",
        category: "choose",
        cssClass: "intro",
        label: "choose"
      }]
    },
    {
      title: "2. Give me more detail",
      section: "garms",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        category: "brands",
        cssClass: "brands",
        label: "Brands"
      },
      {
        category: "size",
        cssClass: "size",
        label: "Size"
      },
      {
        category: "colours",
        cssClass: "colours",
        label: "Colours"
      },
      {
        category: "specifics",
        cssClass: "specifics",
        label: "Specifics"
      }]
    },
    {
      title: "3. Save",
      section: "save",

    }
  ];


  
}
MainController.$inject = ['$scope','StateMachine','DataService','$locale','$routeParams'];