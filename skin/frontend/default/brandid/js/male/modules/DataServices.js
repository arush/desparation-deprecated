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
.factory('ParseService', ['HelperService', function(HelperService){
    

    // Initialize Parse API and objects.
    if(HelperService.getDevOrLive()) {
      // initialise LIVE connection to Parse
    } else {
      // intitialise DEV connection to P
      Parse.initialize("oB4lSEsDL1MuJbLiTe4pHQbNvCJAzfu4nUMdsLL2", "LZ88ABUjZ0l92Nogc3TlCWRlGeKWBkqOXWw382hu");  
    }

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


      fbLoginAndSave: function(male_answers,category,currentUser,saveNeeded) {
        
        var self = this;

        Parse.FacebookUtils.logIn("user_likes,email,user_photos", {
          success: function(user) {
            // Handle successful login

            // attach answered question to logged in user
            if(saveNeeded) {
              self.setAnswer(male_answers,category,'user',user);

              // this sends user to the checkout with a callback after save
              var callback = function(category) {
                // window.location = "/male/#/section/garms/category/" + category + "/question/checkout";
                location.reload();
              };

              self.saveAnswer(male_answers,category,callback);
              
            } else {
              // user has nothing to save, so login is done
              location.reload();  
            }
            


          },
          error: function(user, error) {
            // Handle errors and cancellation
            alert('Something went wrong, please let @male know so he can fix it - male@getbrandid.com or @male');

          }

        });

      },

      setAnswer: function(male_answers,category,question,answer) {

        var parseAnswerObject = this.getObjectFromMaleAnswers(male_answers,category);

        parseAnswerObject.set(question,answer);


      },

      getObjectFromMaleAnswers: function(male_answers,category) {
        var returnObject;

        switch(category) {
          case 'socks':
            returnObject = male_answers.socks;
            break;
          case 'boxers':
            returnObject = male_answers.boxers;
            break;
          case 'tees':
            returnObject = male_answers.tees;
            break;
          case 'jumpers':
            returnObject = male_answers.jumpers;
            break;
          case 'hoodies':
            returnObject = male_answers.hoodies;
            break;
        };

        return returnObject;
      },

      saveAnswer: function(male_answers, category, callback) {

        var parseAnswerObject = this.getObjectFromMaleAnswers(male_answers,category);

        parseAnswerObject.save(null, {
          success: function(savedAnswer) {
            // The object was saved successfully.

            if(callback !== null) {
              callback(category);
            }

          },
          error: function(savedAnswer, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.log(savedAnswer);
            console.log(error);
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

      getCurrentUser: function() {
        return Parse.User.current();
      },

      setToUser: function(currentUser, key, value) {
        
        currentUser.set(key,value);
        
      },

      saveUser: function(currentUser) {
        currentUser.save(null, {
          success: function(user) {
            // The object was saved successfully.


            // Due to a bug in the Parse SDK, need to do a fetch here
            currentUser.fetch({
              success: function (user) {
                // nothing really to do
              },
              error: function (user,error) {
                  console.log(user);
              }
            });
          },
          error: function(user, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.log(error);
          }
        });

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
}])

/**
 * DataService is a simple adapter that returns either the Parse Service, StackMob Service,
 * or single-session Backbone service.
 * This service is injected into the Main Controller
 */
.factory('DataService', ['ParseService', '$location', function (ParseService,$location) {
  // Use the BackboneService by default
  // var serviceToUse = BackboneService;

  // StackMob apps must be hosted on the stackmob server, or be run locally using the stackmob runner, which uses port 4567
  //if ( $location.absUrl().indexOf("stackmob") > 0 || $location.absUrl().indexOf("4567") > 0 ) serviceToUse = StackMobService;

  // If 'parse' appears in the path, use the Parse.com service instead
  // if ( $location.path() === '/parse' ) serviceToUse = ParseService;

  var serviceToUse = ParseService;

  return serviceToUse;
}]);

