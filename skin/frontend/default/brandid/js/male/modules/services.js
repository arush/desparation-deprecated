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


    // Define Parse Models
    var Feedback = Parse.Object.extend("feedback");


    /**
     * ParseService Object
     * This is what is used by the main controller to save and retrieve data from Parse.com.
     * Moving all the Parse.com specific stuff into a service allows us to later swap it out 
     * with another back-end service or localStorage without modifying my controller much, if at all.
     */
    var ParseService = {
      name: "Parse",
      
      fbLogin: function(brandidUser) {
      
        var self = this;

        Parse.FacebookUtils.logIn("user_likes,email,user_photos", {
          success: function(user) {
            // Handle successful login

            // self.updateUserWithFbDetails(brandidUser);


            location.reload();

          },
          error: function(user, error) {
            // Handle errors and cancellation
            alert('Something went wrong, please let M.A.L.E. know so he can fix it - male@getbrandid.com or @MALE');

            console.log("error:");
            console.log(error);

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
      submitFeedback: function(userFeedback,section,category,question) {
        
        // Instantiate a feedback object
        var feedback = new Feedback();

        feedback.set("section",section);
        feedback.set("category",category);
        feedback.set("question",question);
        feedback.set("message",userFeedback.message);
        feedback.set("browser",userFeedback.browser);
        feedback.set("OS",userFeedback.OS);



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

