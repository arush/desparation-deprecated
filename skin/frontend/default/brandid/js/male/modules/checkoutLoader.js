
/* Here we are defining a global variable Checkout so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of checkout depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of checkout from
 * an external data source if we wanted.
 **/

var Checkout = angular.module('CheckoutModule', []);

Checkout.factory('checkoutLoader', ['HelperService', function(HelperService) {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var checkoutLoader = {

    	// this is used to sort arrays of objects
    	

		getCheckoutCopy: function(countryCode) {
			var copy = {
				"en-gb": "In order to .......... £5 towards your first purchase. Bargain right? Right. You don’t need to buy anything, it’s just to make sure that when you are good to go, you can charge your card right from your inbox. No checkout necessary."
			}
			return copy[countryCode];
		},

		getCheckoutTitle: function(countryCode) {
			var checkoutTitle = {
				"en-gb": "Add your credit card today, get £5 credit"
			}
			return checkoutTitle[countryCode];
		},

	    getCheckoutIncentiveUrl: function(countryCode) {
	    	var imageUrl = {
	    			"en-gb": "muji-gloves.png",
	    			"en-us": ""
		    };

		    return imageUrl[countryCode];
	    },

	    getSaveTitle: function(countryCode) {
	    	var title = {
	    		"en-gb": "Where shall I send your email?"
	    	}
	    	return title[countryCode];
	    },

	    getEmailImageUrl: function(countryCode) {
	    	var url = {
	    		"en-gb": "images/male/email-example.png"
	    	}
	    	var skinUrl = HelperService.urls.getSkinUrl();

	    	return skinUrl + url[countryCode];
	    },

	    getSaveCopy: function(countryCode) {
	    	var saveCopy = {
	    			"en-gb": "I'll send your recommendation via email, so cough it up partner. I promise I'll never spam you. Ever.",
	    			"en-us": ""
		    };

		    return saveCopy[countryCode];
	    },
	    getFacebookSubtitle: function(countryCode) {
	    	var saveCopy = {
	    			"en-gb": "Help me help you. I can make better choices if I understand the world you live in. With Facebook, I can:",
	    			"en-us": "Help me help you. I can make better choices if I understand the world you live in. With Facebook, I can:"
		    };

		    return saveCopy[countryCode];
	    },
	    getFacebookConnectReasons: function(countryCode) {
	    	var reasons = {
	    		"en-gb": [
	    			{
	    				reasonCopy: "See photos of you (hopefully wearing clothes)",
	    				imageUrl: HelperService.urls.getSkinUrl() + "images/facebook-connect/reason1.png",
	    			},
	    			{
	    				reasonCopy: "Check the weather where you are",
	    				imageUrl: HelperService.urls.getSkinUrl() + "images/facebook-connect/reason2.png",
	    			},
	    			{
	    				reasonCopy: "Send you important notifications",
	    				imageUrl: HelperService.urls.getSkinUrl() + "images/facebook-connect/reason3.png",
	    			}
	    		]
	    	}
	    	return reasons[countryCode];
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersCheckout','socksCheckout'];

	return checkoutLoader;
}]);