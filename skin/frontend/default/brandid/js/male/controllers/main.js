'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */

var MainController = function MainController($scope,DataService,HelperService,$locale,$routeParams) {

  $scope.routeParams = $routeParams;

  // select the correct option in the menu
  $scope.$on('$routeChangeSuccess', function(scope, next, current){
      
      // this is for metrics tracking
      var trackPage;

      // this matches against the "submenuItem.question" in ng-class
      if(next.params.category === 'intro') {

        $scope.selectedSubmenuItem = 'restart';
        
      } else if(next.params.question === 'checkout') {
        
        $scope.drawerOpen = false;

      } else {

        // for all other cases, select the question 
        $scope.selectedSubmenuItem = next.params.question;
        // $scope.drawerOpen = true;

      }


  });

  /***** CONTROLLER FUNCTIONS *****/


  /***** END CONTROLLER FUNCTIONS *****/

  
  // TODO: sort out the languages for the menu


  $scope.menu = [
    {
      title: "1. What do you need?",
      section: "intro",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        link: "#/section/garms/category/intro",
        path: "/section/garms/category/intro",
        question: "restart",
        cssClass: "intro",
        label: "Add Item"
      }]
    },
    {
      title: "2. Lets get some details",
      section: "garms",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        question: "brands",
        cssClass: "brands",
        label: "Brands"
      },
      {
        question: "size",
        cssClass: "size",
        label: "Size"
      },
      {
        question: "colours",
        cssClass: "colours",
        label: "Colours"
      },
      {
        question: "specifics",
        cssClass: "specifics",
        label: "Specifics"
      }]
    },
    {
      title: "3. Checkout",
      section: "checkout",
      submenuTemplate: "menu/menuItems.html",
      submenuItems: [{
        question: "checkout",
        cssClass: "checkout",
        label: "Checkout"
      }]

    }
  ];


  
};

MainController.$inject = ['$scope','DataService','HelperService','$locale','$routeParams'];