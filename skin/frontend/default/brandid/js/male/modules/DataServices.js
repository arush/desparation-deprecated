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
.factory('ParseService', ['HelperService','$q', function(HelperService,$q) {

    var environment = HelperService.getEnvironment();
    // Initialize Parse API and objects.
    if(environment === "www") {
      // initialise LIVE connection to Parse
      Parse.initialize("cWsBzcLQQMy80sF7KOYWPkeVKDxshxQWUwWk1b27", "rhu8oSmv0Z7qms57HNvJaLlwpc9Mkl2kjIefkTXl");
    } else if(environment === "hack") {
      // intitialise HACK connection to Parse
      Parse.initialize("FSjSiuBpXRS5vSeDVLlhbiraR2jkfH4D9HkFFzzu", "I8ZQlxqbAkSWn5oJq4YNHSvMEgT87hYy5r0cA3jV");
    } else {
      // intitialise TEST connection to Parse
      Parse.initialize("oB4lSEsDL1MuJbLiTe4pHQbNvCJAzfu4nUMdsLL2", "LZ88ABUjZ0l92Nogc3TlCWRlGeKWBkqOXWw382hu");
    }

    // Define Parse Models
    
    // every Answer must have a question property which directly matches the routeParams.category in the frontend
    var Answer = Parse.Object.extend({
      className: "Answer"
      // initialize: function(attributes,options) {
      //   this.category = attributes.category;
      // }

    });
    // var AnswerCollection = Parse.Collection.extend({
    //   model: Answer,
    //   getByCategory: function(category) {
    //     var itemToGet = this.find(function(item){return item.get("category") === category;});
    //     return itemToGet;
    //   }
    // });

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

      getCurrentUser: function() {
        return Parse.User.current();
      },
      isParseObject: function(object) {
        var is = false;
        
        if(object instanceof Parse.Object) {
          is = true;
        }

        return is;
      },

      initNewAnswer: function() {
        // The Collection of Answer objects that match a query.
        var newAnswer = new Answer();

        return newAnswer;
      },
      initNewAnswerCollection: function(user) {
        // var newAnswers = new AnswerCollection({"user":user});

        var UserAnswersCollection = Parse.Collection.extend({
          model: Answer,
          query: (new Parse.Query(Answer)).equalTo("user", user),
          getByCategory: function(category) {

            // TODO: fix this so it only returns the latest matching answer
            var itemToGet = this.find(function(item){return item.get("category") === category;});
            return itemToGet;
          }
          
        });
        var newAnswers = new UserAnswersCollection();

        return newAnswers;
      },

      getUserAnswers: function(user,scope) {
        // to make this promise-aware, we always return a promise
        var deferred = $q.defer();

        var userAnswers = this.initNewAnswerCollection(user);

        // Now we've subclassed Parse.Collection, lets fetch it
        
        var self = this;

        userAnswers.fetch({
          success: function(results) {

            // TODO: is this still necessary?
            if(typeof(results) === "undefined") {
              // user has no answers in Parse, so create a new collection
              console.log(results);
              alert('creating new collection');
              results = self.initNewAnswerCollection(user);
            }

            // we wrap this in $apply using the correct scope passed in because we always need angular to recognise changes
            scope.$apply(function() {
              deferred.resolve(results);
            });

          },
          error: function(results,error) {
            alert('error');
            console.log(results);
            console.log(error);
          }

        });

        return deferred.promise;
      },

      emailSignUp: function(user,scope) {
        var deferred = $q.defer();

        user.signUp(null, {
          success: function(user) {
            // we wrap this in $apply using the correct scope passed in because we always need angular to recognise changes
            scope.$apply(function() {
              deferred.resolve(user);
            });
          },
          error: function(user, error) {
            // something went wrong
            deferred.reject(error);
          }
        });

        return deferred.promise;
      },

      // // TODO: use collections instead
      // query: {
      //   usersBoxers: function(user, male_answers, scope) {
      //     var deferred = $q.defer();

          
      //       // Parse.Object was previously created
      //       var query = new Parse.Query(Boxers);
      //       query.equalTo("user", user);
      //       query.first({
      //         success: function(result) {
      //           // console.log(result);
      //           scope.$apply(function() {
      //             deferred.resolve(result);
      //           });

      //         },
      //         error: function(result,error) {
                
      //           deferred.reject(error);

      //           console.log(result);
      //           console.log(error);
      //         }
      //       });
          

      //     return deferred.promise;
            
      //   },
        
      initNewUser: function() {
        var user = new Parse.User();
        return user;
      },

      fbLoginAndSave: function(male_answers,category,currentUser) {
        
        var self = this;

        Parse.FacebookUtils.logIn("user_likes,email,user_photos", {
          success: function(user) {
            // Handle successful login


            // if this is a registration, we need to capture some data from FB
            if(!user.get('email')) {
                // track
                var metricsPayload = {"B4.0_Funnel": $routeParams.category,"B4.0_Step": "Register (Save Basket)", "B4.0_Registration Method": "Facebook Connect"};
                HelperService.metrics.track('B4.0_Attempted Registration', metricsPayload);

                self.saveRegistrationDataFromFacebook(male_answers,category,user);
            } else {

                // if not identify the user in metrics and reload the page
                HelperService.metrics.identify(user.get('email'));
                HelperService.metrics.setLastLogin();

                location.reload();
                // self.saveAnswersAfterSuccessfulLogin(male_answers,category,user);
            }

            
          },
          error: function(user, error) {
            // Handle errors and cancellation
            alert('Something went wrong, please let @male know so he can fix it - male@getbrandid.com or @male');
            console.log(error);

          }

        });

      },

      setAnswer: function(currentAnswer,question,answer) {
        
        // just get the first one from the array - assumption is there is only one of each category anyway
        currentAnswer.set(question,answer);

      },

      saveRegistrationDataFromFacebook: function(male_answers,category,user) {
        var authData = user.get("authData");
        var requestURI = '/' + authData.facebook.id + '?fields=first_name,last_name,gender,email,birthday,location';
        var self = this;

        FB.api(requestURI, function(response) {
          
          // Facebook response is unreliable. Need to check if objects exist first
          // i wish we were doing this in coffeescript
          var metricsPayload = {
            "Registration Method": "Facebook Connect",
            "$created": new Date(),
            "$last_login": new Date()
          };

          if(response.first_name !== "undefined") {
            self.setToUser( user, "first_name", response.first_name);
            metricsPayload.first_name = response.first_name;
          }
          if(response.last_name !== "undefined") {
            self.setToUser( user, "last_name", response.last_name);
            metricsPayload.last_name = response.last_name;
          }
          if(response.gender !== "undefined") {
            self.setToUser( user, "gender", response.gender);
            metricsPayload.gender = response.gender;
          }
          if(response.birthday !== "undefined") {
            self.setToUser( user, "birthday", response.birthday);
            metricsPayload.birthday = response.birthday;
          }
          if(response.location !== "undefined") {
            self.setToUser( user, "location", response.location);
            if(response.location.name !== "undefined") {
              metricsPayload.location = response.location.name;
            }
          }

          // if email exists, use that as the identity in metrics
          if(response.email !== "undefined") {
            self.setToUser( user, "email", response.email);
            HelperService.metrics.identify(response.email);
            metricsPayload.email = response.email;
          }


          HelperService.metrics.track("Registered", metricsPayload);
          
          // /* KISSmetrics Tracking */
          // if(typeof(_kmq) !== "undefined") {
          //   _kmq.push(['record', 'Registered', metricsPayload]);
          // }
          // /* Mixpanel Tracking */
          // if(typeof(mixpanel) !== "undefined") {

          //   // it is imperative alias is only called once on a user - at registration. all other places, use identify
          //   /*****/
          //   // mixpanel.alias(response.email);
          //   /*****/

          //   // NB - mixpanel.identify may or may not have been called earlier depending if email address was given or not
          //   mixpanel.track('Registered',metricsPayload);
          //   mixpanel.people.set(metricsPayload);
          //   // mixpanel.register({
          //   //   first_name: response.first_name,
          //   //   last_name: response.last_name,
          //   //   email: response.email,
          //   //   gender: response.gender,
          //   //   birthday: response.birthday,
          //   //   location: response.location.name
          //   // });
          // }

          user.save(null, {
            success: function(user) {
              // The object was saved successfully.

              // Due to a bug in the Parse SDK, need to do a fetch here
              user.fetch({
                success: function (user) {
                  // now we can save the answers against the user
                  self.saveAnswer(male_answers,category,user /* add scope */);
                },
                error: function (user,error) {
                    self.saveAnswer(male_answers,category,user /* add scope */);
                    console.log(user);
                }
              });
            },
            error: function(user, error) {
              // The save failed.
              // error is a Parse.Error with an error code and description.
              self.saveAnswer(male_answers,category,user /* add scope */);
              console.log(error);
            }
          });


        });

      },

      saveAnswer: function(currentAnswer,scope) {

        // to make this promise-aware, we always return a promise
        var deferred = $q.defer();

        currentAnswer.save({
          success: function(results) {

            // for some reason, we scope.$apply caused an error (digest already in progress) so removed it
              deferred.resolve(results);

          },
          error: function(results,error) {
            console.log(error);
            deferred.reject(error);
          }

        });

        return deferred.promise;

      },
      // this happens after registration
      addAnswerToMale: function(male_answers,currentAnswer, user, scope) {

        // we always need to save the answer to the user's collection stored in Parse

        // to make this promise-aware, we always return a promise
        var deferred = $q.defer();

        male_answers.create(currentAnswer,{
          success: function(results) {

            // we wrap this in $apply using the correct scope passed in because we always need angular to recognise changes
            scope.$apply(function() {
              deferred.resolve(results);
            });

          },
          error: function(results,error) {
            console.log(error);
            deferred.reject(error);
          }

        });

        return deferred.promise;

      },


      // fetch: function(currentUser) {
      //   currentUser.fetch({
      //     success: function(user) {
      //       // The object was refreshed successfully.
      //       // alert('fetched successfully');

      //     },
      //     error: function(user, error) {
      //       // The object was not refreshed successfully.
      //       // error is a Parse.Error with an error code and description
      //       alert("Something went wrong, please contact @male");
      //       console.log(error);
      //     }
      //   });

      // },

      // user: {
      //   // wrapper for Parse's user.get()
      //   get: function(attribute) {
      //     var user = this.getCurrentUser();
      //     var attributeValue = user.get(attribute);
      //     return attributeValue;
      //   }
      // },

      

      setToUser: function(currentUser, key, value) {
        
        currentUser.set(key,value);
        
      },

      saveUser: function(currentUser) {

        // TODO: make promise-aware

        // currentUser.save(null, {
        //   success: function(user) {
        //     // The object was saved successfully.


        //     // Due to a bug in the Parse SDK, need to do a fetch here
        //     currentUser.fetch({
        //       success: function (user) {
        //         // nothing really to do
        //       },
        //       error: function (user,error) {
        //           console.log(user);
        //       }
        //     });
        //   },
        //   error: function(user, error) {
        //     // The save failed.
        //     // error is a Parse.Error with an error code and description.
        //     console.log(error);
        //   }
        // });

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


        feedback.save(null, {
          success: function(feedbackSaved) {
            // The object was saved successfully.

            jQuery('#feedback-message-text').val("");

            alert("Thanks for your feedback!");

          },
          error: function(feedbackSaved, error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.log(error);
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

