'use strict';

var ngMaleApp = angular.module('ngMaleApp', ['ui','DataServices','HelperServices','BrandsModule','ColoursModule','SizeModule','SpecificsModule','CheckoutModule','SuccessModule']);

ngMaleApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo:'/section/garms/category/intro',
        // bring this back if we want a pre-intro screen
         // templateUrl:'start.html',
         controller:MainController
      })
      .when('/section/:section/category/:category', {
        // redirectTo:'/section/intro'
        // bring this back if we want a pre-intro screen
         templateUrl:'categoryProxy.html',
         controller:CategoryController
      })
      // .when('/section/:section', {
      //    templateUrl:'sectionProxy.html',
      //    controller:SectionController
      // })
      .when('/section/:section/category/intro/question/:question', {
         redirectTo:'/section/garms/category/intro',
         controller:MainController
      })
      .when('/section/:section/category/:category/question/restart', {
         redirectTo:'/section/garms/category/intro',
         controller:MainController
      })
      .when('/section/:section/category/:category/question/:question', {
         templateUrl: 'detailViewProxy.html',
         controller:QuestionController
      })
      .when('/section/:section/category/:category/question/:question/account_code/:account_code/key/:key', {
         templateUrl: 'detailViewProxy.html',
         controller:QuestionController
      })
      
      .otherwise({
        redirectTo: '/section/garms/category/intro'
      });
}]);

ngMaleApp.run(['$rootScope', '$locale','$routeParams', 'DataService', 'HelperService', function($rootScope,$locale,$routeParams,DataService,HelperService) {

  // ***** CONTROLLER PROPERTIES ***** //
    
    $locale.id = "en-gb";

    // this intialises the connection to Parse
    DataService.init();

    $rootScope.drawerOpen = false;

    $rootScope.currentUser = false;
    $rootScope.loggedIn = false;
    $rootScope.facebookConnected = false;

    // Define Parse Models
    
    var Boxers = Parse.Object.extend("Boxers");
    var Socks = Parse.Object.extend("Socks");
    var Tees = Parse.Object.extend("Tees");
    var Jumpers = Parse.Object.extend("Jumpers");
    var Hoodies = Parse.Object.extend("Hoodies");


    // make a reference to the current Parse.User object
    $rootScope.currentUser = Parse.User.current();
    
    if ($rootScope.currentUser) {

        $rootScope.loggedIn = true;

        // if authData exists, we assume facebook is connected, and load the facebook profile image, else load blank profile image
        if($rootScope.currentUser.get("authData")) {
          $rootScope.profileImageUrl = 'https://graph.facebook.com/'+$rootScope.currentUser.attributes.authData.facebook.id+'/picture';
          $rootScope.facebookConnected = true;
        } else {
          $rootScope.profileImageUrl = HelperService.urls.getSkinUrl() + 'images/facebook-connect/blank-profile.png';
          $rootScope.facebookConnected = false;
        }
          

        // track the identity in case user has cleared their cache
        var identity = $rootScope.currentUser.get('email');
        HelperService.metrics.identify(identity);

    } else {

      $rootScope.currentUser = new Parse.User();

    };

    $rootScope.male_answers = {};

    $rootScope.male_answers.boxers = new Boxers();
    // $rootScope.male_answers.boxers.set("user",$rootScope.currentUser);

    $rootScope.male_answers.socks = new Socks();
    // $rootScope.male_answers.socks.set("user",$rootScope.currentUser);

    $rootScope.male_answers.tees = new Tees();
    // $rootScope.male_answers.tees.set("user",$rootScope.currentUser);

    $rootScope.male_answers.jumpers = new Jumpers();
    // $rootScope.male_answers.jumpers.set("user",$rootScope.currentUser);

    $rootScope.male_answers.hoodies = new Hoodies();
    // $rootScope.male_answers.hoodies.set("user",$rootScope.currentUser);



    // feedback object
    $rootScope.feedback = {
      section: $routeParams.section,
      category: $routeParams.category,
      question: $routeParams.question,
      message: ""
    };

    if(typeof(BrowserDetect) !== "undefined") {
      $rootScope.feedback.OS = BrowserDetect.OS;
      $rootScope.feedback.browser = BrowserDetect.browser + " " + BrowserDetect.version;
    };

    
    
    

  // ***** END CONTROLLER PROPERTIES ***** //


  // ***** CONTROLLER FUNCTIONS ***** //

    // ***** FEEDBACK ON EVERY PAGE ***** //
    $rootScope.submitFeedback = function(section,category,question) {
      if($rootScope.feedback.message !== "") {

        // TODO: metrics

        DataService.submitFeedback($rootScope.currentUser,$rootScope.feedback, $rootScope.feedbackForm, section, category, question);  
      }
      
    };


    // ***** LOGIN FUNCTIONS ***** //

    
    $rootScope.fbLoginFromHeader = function(category){
      
      var saveNeeded = HelperService.isSaveNeeded();

      // log them in with nothing to save
      DataService.fbLoginAndSave($rootScope.male_answers,category /* if this is 'intro', nothing happens */,$rootScope.currentUser);

    };

    // Login modal

    $rootScope.loginAttempt = {
      email: "",
      password: ""
    };

    $rootScope.loginWithEmail = function() {

      Parse.User.logIn($rootScope.loginAttempt.email, $rootScope.loginAttempt.password, {
        success: function(user) {
          // this handles the save and reload
          DataService.saveAnswersAfterSuccessfulLogin($rootScope.male_answers,$routeParams.category /* if this is 'intro', nothing happens */,$rootScope.currentUser);
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          jQuery("#modal-login-form .error").html(error.message).show();
          jQuery("#modal-login-form button").removeAttr("disabled");
          jQuery("#modal-login-form button").text("Try Again");
        }
      });

      jQuery("#modal-login-form button").attr("disabled", "disabled");
      jQuery("#modal-login-form button").text("Hold Tight");
    }

    // Register modal
    
    $rootScope.registrationAttempt = {
      first_name: "",
      email: "",
      password: "",
      username: ""
    };

    $rootScope.$on('goToRegister', function() {
      $rootScope.loginModalShown = false;
      $rootScope.registerModalShown = true;
    });

    $rootScope.$on('goToLogin', function() {
      $rootScope.loginModalShown = true;
      $rootScope.registerModalShown = false;
    });

    // TODO: password reset
    $rootScope.passwordReset = function() {
      Parse.User.requestPasswordReset("email@example.com", {
        success: function() {
          // Password reset request was sent successfully
        },
        error: function(error) {
          // Show the error message somewhere
          console.log(error);
          alert("Sorry, " + error.message);
        }
      });
    };

    $rootScope.register = function() {

      var first_name = HelperService.format.first_name($rootScope.registrationAttempt.first_name);
      
      $rootScope.currentUser.set("first_name", first_name);
      $rootScope.currentUser.set("username", $rootScope.registrationAttempt.email);
      $rootScope.currentUser.set("email", $rootScope.registrationAttempt.email);
      $rootScope.currentUser.set("password", $rootScope.registrationAttempt.password);

      $rootScope.currentUser.signUp(null, {
        success: function(user) {

          DataService.saveAnswersAfterSuccessfulLogin($rootScope.male_answers,$routeParams.category /* if this is 'intro', nothing happens */,$rootScope.currentUser, /* saveNeeded */ true);

        },

        error: function(user, error) {
          console.log(error);
          jQuery("#modal-register-form .error").text('Computer says: ' + error.message).show();
          jQuery("#modal-register-form button").removeAttr("disabled");
          jQuery("#modal-register-form button").text("Try Again");
        }
      });

      jQuery("#modal-register-form button").attr("disabled", "disabled");
      jQuery("#modal-register-form button").text("Hold Tight");


    };

  // ***** END CONTROLLER FUNCTIONS ***** //
}]);