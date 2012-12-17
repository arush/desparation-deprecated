'use strict';

/**
 * This is the Main controller for the application.  There is only one right now,
 * given the simplistic nature of the application.  
 *
 */
var MainController = function MainController($scope,DataService,HelperService,$locale,$routeParams) {


  // ***** CONTROLLER PROPERTIES ***** //
    
    $locale.id = "en-gb";

    $scope.drawerOpen = false;

    $scope.currentUser = false;
    $scope.loggedIn = false;

    // this is so the menu can access current url parameters and highlight the current menu selection
    $scope.routeParams = $routeParams;

    // Define Parse Models
    
    var Boxers = Parse.Object.extend("Boxers");
    var Socks = Parse.Object.extend("Socks");
    var Tees = Parse.Object.extend("Tees");
    var Jumpers = Parse.Object.extend("Jumpers");
    var Hoodies = Parse.Object.extend("Hoodies");


    // make a reference to the current Parse.User object
    $scope.currentUser = Parse.User.current();
    
    if ($scope.currentUser) {

        $scope.loggedIn = true;

        // track the identity in case user has cleared their cache
        var identity = $scope.currentUser.get('email');
        HelperService.metrics.identify(identity);

    } else {

      $scope.currentUser = new Parse.User();

    };

    $scope.male_answers = {};

    $scope.male_answers.boxers = new Boxers();
    // $scope.male_answers.boxers.set("user",$scope.currentUser);

    $scope.male_answers.socks = new Socks();
    // $scope.male_answers.socks.set("user",$scope.currentUser);

    $scope.male_answers.tees = new Tees();
    // $scope.male_answers.tees.set("user",$scope.currentUser);

    $scope.male_answers.jumpers = new Jumpers();
    // $scope.male_answers.jumpers.set("user",$scope.currentUser);

    $scope.male_answers.hoodies = new Hoodies();
    // $scope.male_answers.hoodies.set("user",$scope.currentUser);



    // feedback object
    $scope.feedback = {
      section: $routeParams.section,
      category: $routeParams.category,
      question: $routeParams.question,
      message: ""
    };

    if(typeof(BrowserDetect) !== "undefined") {
      $scope.feedback.OS = BrowserDetect.OS;
      $scope.feedback.browser = BrowserDetect.browser + " " + BrowserDetect.version;
    };

    
    
    

  // ***** END CONTROLLER PROPERTIES ***** //


  // ***** CONTROLLER FUNCTIONS ***** //

    // ***** FEEDBACK ON EVERY PAGE ***** //
    $scope.submitFeedback = function(section,category,question) {
      if($scope.feedback.message !== "") {

        // TODO: metrics

        DataService.submitFeedback($scope.currentUser,$scope.feedback, $scope.feedbackForm, section, category, question);  
      }
      
    };


    // ***** LOGIN FUNCTIONS ***** //
    $scope.fbLoginFromHeader = function(category) {

      // TODO: this breaks when 'intro' changes
      var saveNeeded = true;
      // if they are in the intro they have nothing to save
      if($routeParams.category === 'intro') {
        saveNeeded = false;
      }

      // log them in with nothing to save
      DataService.fbLoginAndSave($scope.male_answers,$routeParams.category,$scope.currentUser,saveNeeded);

    };



  // ***** END CONTROLLER FUNCTIONS ***** //



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