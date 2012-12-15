
/* Here we are defining a global variable Checkout so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of checkout depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of checkout from
 * an external data source if we wanted.
 **/

var Checkout = angular.module('CheckoutModule', []);

Checkout.factory('checkoutLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var checkoutLoader = {

    	// this is used to sort arrays of objects
    	

		getCheckoutCopy: function(countryCode) {
			var copy = {
				"en-gb": "Ok, let’s talk turkey, let’s make something happen, let’s do a deal. If you register your card details today and credit your BRANDiD account with one English pound, we’ll send you a pair of Muji touchscreen gloves worth £12.95. Bargain right? Right."
			}
			return copy[countryCode];
		},

		getCheckoutTitle: function(countryCode) {
			var checkoutTitle = {
				"en-gb": "Load £1 into your account and get free touchscreen gloves!"
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

	    getCheckoutSummaryTitle: function(countryCode) {
	    	var title = {
	    		"en-gb": "This is what we'll find for you"
	    	}
	    	return title[countryCode];
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersCheckout','socksCheckout'];

	return checkoutLoader;
});