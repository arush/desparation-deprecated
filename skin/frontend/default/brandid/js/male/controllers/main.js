'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
function MainController($scope,StateMachine,DataService,$locale,$routeParams) {

  // ***** CONTROLLER PROPERTIES ***** //

    // this is the current session's user, which gets destroyed when the browser closes. it will only hold one set of answers at a time per item,
    // and that answer get
    $scope.user = {
      male_answers: {
        garms : {
          socks: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          boxers: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          tshirts: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          jumpers: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          hoodies: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          shoes: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          },
          other: {
            brands: [],
            size: [],
            colours: [],
            specifics: []
          }
        }
      }
    };
    $scope.currentUser = false;
    $scope.loggedIn = false;
    $scope.feedback = {
      section: $routeParams.section,
      category: $routeParams.category,
      question: $routeParams.question,
      message: ""
    };

    if(typeof(BrowserDetect) !== "undefined") {
      $scope.feedback.OS = BrowserDetect.OS;
      $scope.feedback.browser = BrowserDetect.browser + " " + BrowserDetect.version;
    }
    

  // ***** END CONTROLLER PROPERTIES ***** //


  // ***** CONTROLLER FUNCTIONS ***** //

    // ***** FEEDBACK ON EVERY PAGE ***** //

        $scope.submitFeedback = function(section,category,question) {
          if($scope.feedback.message !== "") {

            // TODO: metrics

            DataService.submitFeedback($scope.currentUser,$scope.feedback, section, category, question);  
          }
          
        }
    // ***** FEEDBACK ON EVERY PAGE ***** //

    // ***** LOGIN FUNCTIONS ***** //

        $scope.setUserProfileImage = function() {

          // we have 2 user objects, because one is a reference to the actual Parse.User object, and the other is for easy use in the templates
          $scope.user.fbID = $scope.currentUser.attributes.authData.facebook.id;


        };


        $scope.fbLogin = function() {

          // passes the angular scope object by reference, and the service sets $scope.user.profileImageUrl after logging them into facebook
          var loggedIn = DataService.fbLogin($scope.user);

        }

    // ***** END LOGIN FUNCTIONS ***** //


    $scope.init = function() {

      // make a reference to the Parse.User object
      $scope.currentUser = Parse.User.current();
      
      if ($scope.currentUser) {
          
          $scope.setUserProfileImage();
          $scope.loggedIn = true;

      } else {
          // TODO: whatevers needed for not-logged-in users

      }
      
      
    }


    $scope.init();


  // ***** END CONTROLLER FUNCTIONS ***** //


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

  if ($locale.id === 'en-gb') {
    
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