/**
 * DataService Module
 *
 *  A collection of services that provide a variety of back-end options for saving
 *  and retrieving data.  StackMob.com and Parse.com are Backend-as-a-Service companies.
 *  They provide easy to use databases for mobile and HTML5 applications.
 */
angular.module('DataServices', []) 
/**
 * Parse Service
 * Use Parse.com as a back-end for the application.
 */
.factory('ParseService', function(){
    // Initialize Parse API and objects.
    Parse.initialize("oB4lSEsDL1MuJbLiTe4pHQbNvCJAzfu4nUMdsLL2", "LZ88ABUjZ0l92Nogc3TlCWRlGeKWBkqOXWw382hu");



    // FACEBOOK init

    // window.fbAsyncInit = function() {
    //   Parse.FacebookUtils.init({
    //     appId      : '250529718312984', // Facebook App ID
    //     channelUrl : '//brandid.macbook.pro/facebook/channel', // Channel File
    //     status     : true, // check login status
    //     cookie     : true, // enable cookies to allow Parse to access the session
    //     xfbml      : true  // parse XFBML
    //   });
     
    //   // Additional initialization code here
    // };


    /**
     * ParseService Object
     * This is what is used by the main controller to save and retrieve data from Parse.com.
     * Moving all the Parse.com specific stuff into a service allows us to later swap it out 
     * with another back-end service or localStorage without modifying my controller much, if at all.
     */
    var ParseService = {
      name: "Parse",
      
      fbLogin: function(currentUser,male_answers) {
        
        var self = this;

        Parse.FacebookUtils.logIn("user_likes,email,user_photos", {
          success: function(user) {
            // Handle successful login

            // self.updateUserWithFbDetails(brandidUser);

            // attach all answered questions to logged in user

            self.saveAllAnswers(currentUser,male_answers);

            

          },
          error: function(user, error) {
            // Handle errors and cancellation
            alert('Something went wrong, please let @male know so he can fix it - male@getbrandid.com or @male');
            console.log(error);

          }

        });

      },

      saveAllAnswers: function(currentUser,male_answers) {
        var self = this;
        angular.forEach(male_answers, function(answer) {

          answer.set("user",currentUser);
          self.saveAnswer(answer);

        });

        location.reload();
        
      },

      saveAnswer: function(answer) {
        answer.save(null, {
          success: function(answer) {
            // The object was saved successfully.

            // console.log(item);
            // DataService.fetch($scope.currentUser);

            // console.log(user);

          },
          error: function(answer, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            // alert("Cannot save your answers right now, please contact @male");
            console.log(error);
            alert('arrrg');
          }
        });
      },


      fetch: function(currentUser) {
        currentUser.fetch({
          success: function(myObject) {
            // The object was refreshed successfully.
            alert('fetched successfully');

          },
          error: function(myObject, error) {
            // The object was not refreshed successfully.
            // error is a Parse.Error with an error code and description
            alert("Something went wrong, please contact @male");
          }
        });

      },

      updateUserWithFbDetails: function(brandidUser) {

        brandidUser.fbID = FB.getUserID();

      },

      getCurrentUser: function() {
        return Parse.User.current();
      },
      
      // feedback form on every page
      submitFeedback: function(currentUser,userFeedback,feedbackForm,section,category,question) {

        // Instantiate a feedback object
        var feedback = new Feedback();

        feedback.set("section",section);
        feedback.set("category",category);
        feedback.set("question",question);
        feedback.set("message",userFeedback.message);
        feedback.set("browser",userFeedback.browser);
        feedback.set("OS",userFeedback.OS);

        if(currentUser) {
          feedback.set("user",currentUser);
        }


        // console.log(feedback);

        feedback.save(null, {
          success: function(feedbackSaved) {
            // The object was saved successfully.

            jQuery('#feedback-message-text').val("");

            alert("Thanks for your feedback!");

          },
          error: function(feedbackSaved, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.

          }
        });
      }
      
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
})

/**
 * DataService is a simple adapter that returns either the Parse Service, StackMob Service,
 * or single-session Backbone service.
 * This service is injected into the Main Controller
 */
.factory('DataService', function (ParseService,$location) {
  // Use the BackboneService by default
  // var serviceToUse = BackboneService;

  // StackMob apps must be hosted on the stackmob server, or be run locally using the stackmob runner, which uses port 4567
  //if ( $location.absUrl().indexOf("stackmob") > 0 || $location.absUrl().indexOf("4567") > 0 ) serviceToUse = StackMobService;

  // If 'parse' appears in the path, use the Parse.com service instead
  // if ( $location.path() === '/parse' ) serviceToUse = ParseService;

  var serviceToUse = ParseService;

  return serviceToUse;
});

