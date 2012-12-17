
/* Here we are defining a global variable Success so we can extend it with factory methods in other files.
 * 
 *
 **/

var Success = angular.module('SuccessModule', []);

Success.factory('successLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var successLoader = {
    	

		getSuccessCopy: function(countryCode) {
			var copy = {
				"en-gb": "Ok, now I've got your card on file you won't have to go through that again. I'm working on some options for you, so keep a lookout for an email from male@getbrandid.com in a few hours. Don't forget to check your spam folder just in case."
			}
			return copy[countryCode];
		},

		getSuccessTitle: function(countryCode) {
			var successTitle = {
				"en-gb": "M.A.L.E. is about to hit your inbox"
			}
			return successTitle[countryCode];
		}
	};


	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersSuccess','socksSuccess'];

	return successLoader;
});