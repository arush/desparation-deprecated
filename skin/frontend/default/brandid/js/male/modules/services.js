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

    // Define Parse Model and Collection for Signature records (firstName, lastName, email, signature, and petitionId)
    var Signature = Parse.Object.extend("signature");
    var SignatureCollection = Parse.Collection.extend({ model: Signature });

    // Define Parse Model and Collection for Petitions. 
    var Petition = Parse.Object.extend("petition");
    var PetitionCollection = Parse.Collection.extend({ model: Petition });

    /**
     * ParseService Object
     * This is what is used by the main controller to save and retrieve data from Parse.com.
     * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
     * with another back-end service provider without modifying my controller much, if at all.
     */
    var ParseService = {
      name: "Parse",
      
      // Retrieve all petitions
      getPetitions : function getPetitions(callback) {
        // Instantiate a petition collection
        var petitions = new PetitionCollection();

        // Use Parse's fetch method (a modified version of backbone.js fetch) to get all the petitions.
        petitions.fetch({
          success: function (results) {
              // Send the petition collection back to the caller if it is succesfully populated. 
              callback(petitions);
          },
          error: function ( results,error) {
              alert("Collection Error: " + error.message);
          }
        });
      },

      // Save the data from the signature form to Parse.com
      saveSignature : function saveSignature(data, callback){
        var sig = new Signature();
        sig.save( data,
                  {
                    success: function (obj) {
                      callback(obj);
                    },
                    error: function (obj, error) {
                      alert("Error: " + error.message);
                    }
                  }
        );
      },

      // Get signature data for a specified petition
      getSignatures : function getSignatures(petitionId, callback) {
        // Create a new Parse Query object in order to search Signature records by petitionId
        var query = new Parse.Query(Signature);
        query.equalTo("petitionId", petitionId);
        // Use the find method to retreive all signatures with the given petitionId
        query.find({
          success: function (results) {
            callback(results);
          },
          error: function (error) {
            alert("Error: " + error.message);
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

