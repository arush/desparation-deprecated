'use strict';

// this is for intercom.io integration
var intercomSettings = {};

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


    $rootScope.drawerOpen = false;

    $rootScope.currentUser = false;
    $rootScope.loggedIn = false;
    $rootScope.facebookConnected = false;

    // male_answers only gets set when user registers or when user logs in
    $rootScope.male_answers = {};

    // currentAnswer only gets set when user chooses a category. At that point it will try and load previous answers and init a new answer if none exists
    $rootScope.currentAnswer = {};
    

    // make a reference to the current Parse.User object
    $rootScope.currentUser = DataService.getCurrentUser();
    
    if ($rootScope.currentUser) {

        $rootScope.loggedIn = true;
        HelperService.setIntercomSettings($rootScope.currentUser);

        // also need to set last login time here

        // fetch collection of answers for the user
        var promise = DataService.getUserAnswers($rootScope.currentUser,$rootScope);

        promise.then(function(answers) {
          $rootScope.male_answers = answers;

        }, function(reason) {
          // something went wrong in the API call, so init new object
          console.log("Could not fetch users answers collection");
          console.log(reason);
          // male_answers.boxers = new Boxers();
        });

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

      if($rootScope.currentUser === null) {
        $rootScope.currentUser = DataService.initNewUser();  
      }
      
      HelperService.setIntercomLoggedOutSettings($rootScope.currentUser);

      
    };

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
      // log them in with nothing to save
      DataService.fbLoginAndSave($rootScope.male_answers,category /* if this is 'intro', nothing happens */,$rootScope.currentUser);

    };

    // Login modal

    $rootScope.loginAttempt = {
      email: "",
      password: ""
    };

    $rootScope.loginWithEmail = function() {

      // TODO: Make promise-aware
      // DataService.emailLogin($rootScope.loginAttempt)

      Parse.User.logIn($rootScope.loginAttempt.email, $rootScope.loginAttempt.password, {
        success: function(user) {

          // track login
          HelperService.metrics.setLastLogin();
          // this handles the save and reload

          // TODO: is this still needed?
          // DataService.saveAnswersAfterSuccessfulLogin($rootScope.male_answers,$routeParams.category /* if this is 'intro', nothing happens */,$rootScope.currentUser);
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


      var promise = DataService.emailSignUp($rootScope.currentUser,$rootScope);

      promise.then(function(user) {

          // track registration
          var metricsPayload = {
            "Registration Method": "Email Signup",
            "$created": new Date(),
            "$last_login": new Date()
          };
          HelperService.metrics.track("Registered", metricsPayload);

          // we must nest the 'then' statement here because we need access to 'user' in a nested call below

          // User has no answers in Parse, so create the collection and save the answer to it
          $rootScope.male_answers = DataService.initNewAnswerCollection($rootScope.currentUser);

          // if the user has answered a question
          if(DataService.isParseObject($rootScope.currentAnswer)) {
            // create an association with the newly created user
            $rootScope.currentAnswer.set("user",user);

            // create the answer in the answers collection, which pushes it to Parse also
            return DataService.addAnswerToMale($rootScope.male_answers,$rootScope.currentAnswer,user,$rootScope)
          
          } else {
            // this is to protect against situations where the user can register without answering any questions
            // progress without saving anything because there is nothing to save
            location.reload();
          }
      })
      .then(function() {
      
        location.reload();
      
      }, function(error) {

        console.log(error);
        jQuery("#modal-register-form .error").text('Computer says: ' + error.message).show();
        jQuery("#modal-register-form button").removeAttr("disabled");
        jQuery("#modal-register-form button").text("Try Again");

      });

      jQuery("#modal-register-form button").attr("disabled", "disabled");
      jQuery("#modal-register-form button").text("Hold Tight");

    };


    $rootScope.setCurrentAnswer = function(chosenCategory) {
      // init a new answer if one doesn't exist in the user's existing answers
      // but first check if male_answers collection has been initialised so we can call 'getByCategory'
      if($rootScope.loggedIn) { 
        var existingAnswer = $rootScope.male_answers.getByCategory(chosenCategory);
        // does the item exist in the user's Answer collection?
        if(typeof(existingAnswer) !== "undefined") {
          // retrieve selected answer so user can edit it

          $rootScope.currentAnswer = $rootScope.male_answers.getByCategory(chosenCategory);

        } else {
          // no existing answer in the user's Answer collection, so create it
          $rootScope.currentAnswer = DataService.initNewAnswer();
          $rootScope.currentAnswer.set("category",chosenCategory);
        }

      } else {
        // user is either logged out or has not initialised male_answers somewhow, either way we can init a new Answer safely

        $rootScope.currentAnswer = DataService.initNewAnswer();
        $rootScope.currentAnswer.set("category",chosenCategory);
      }
      
      // just to be sure, lets set the category
      
      // we also want to associate this answer with the user if logged in. Otherwise this association gets created on register
      if($rootScope.loggedIn) {
        var existingAnswer = $rootScope.male_answers.getByCategory(chosenCategory);

        //$rootScope.currentAnswer.set("user",$rootScope.currentUser);
        // must save here as QuestionController logic assumes the answer exists in the DB
        if(typeof(existingAnswer) === "undefined") {
          DataService.saveAnswer($rootScope.currentAnswer);
        }
      }
    };
  // ***** END CONTROLLER FUNCTIONS ***** //
}]);