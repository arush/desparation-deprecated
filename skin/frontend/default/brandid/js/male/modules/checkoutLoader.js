
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

		getBasketTitle: function(countryCode) {
			var basketTitle = {
				"en-gb": "Email ETA: ≈3 days"
			}
			return basketTitle[countryCode];
		},

		getCheckoutTitle: function(countryCode) {
			var checkoutTitle = {
				"en-gb": "Jump the queue by adding your credit card, get £5 credit"
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
	    },

	    getBasket: function(category,male_answers) {

	    	var basket = {
	    		brands : this.getBrandsFrom(category, male_answers),
				size : this.getSizeFrom(category, male_answers),
				colours : this.getColoursFrom(category, male_answers),
				specifics : this.getSpecificsFrom(category, male_answers)
	    	};

	    	return basket;
	    },

	    getBrandsFrom: function(category,male_answers) {
	    	var brands;

	    	switch(category) {
	    		case 'socks':
	    			brands = male_answers.socks.attributes.brands;
	    			break;
	    		case 'boxers':
	    			brands = male_answers.boxers.attributes.brands;
	    			break;
	    		case 'tees':
	    			brands = male_answers.tees.attributes.brands;
	    			break;
	    		case 'jumpers':
	    			brands = male_answers.jumpers.attributes.brands;
	    			break;
	    		case 'hoodies':
	    			brands = male_answers.hoodies.attributes.brands;
	    			break;
	    	};


	    	return brands;
	    },

    	// human readable version of SELECT2 elements
	    humanizeAnswer: function(answer) {
	    	var humanized = "";

	    	angular.forEach(answer, function(answerItem) {

	    		// check the format of the answer, is it { id: ... , text: ...} or ["item","item"]
	    		if(typeof(answerItem.text) !== "undefined") {
	    			humanized += answerItem.text + ", ";	
	    		} else {
	    			//assume array of strings
	    			humanized += answerItem + ", ";
	    		}
	    		
	    	});

	    	// remove last comma
	    	humanized = humanized.substring(0, humanized.length - 2);

	    	return humanized;
	    },

	    humanizeSize: function(size) {
	    	
	    	if(typeof(size) !== "undefined") {
	    		return size.size;
	    	}
	    	

	    },

	    getSizeFrom: function(category,male_answers) {
	    	var size;

	    	switch(category) {
	    		case 'socks':
	    			size = male_answers.socks.attributes.size;
	    			break;
	    		case 'boxers':
	    			size = male_answers.boxers.attributes.size;
	    			break;
	    		case 'tees':
	    			size = male_answers.tees.attributes.size;
	    			break;
	    		case 'jumpers':
	    			size = male_answers.jumpers.attributes.size;
	    			break;
	    		case 'hoodies':
	    			size = male_answers.hoodies.attributes.size;
	    			break;
	    	};

	    	// size = this.humanizeSize(size);

	    	return size;
	    },

	    getColoursFrom: function(category,male_answers) {
	    	var colours;

	    	switch(category) {
	    		case 'socks':
	    			colours = male_answers.socks.attributes.colours;
	    			break;
	    		case 'boxers':
	    			colours = male_answers.boxers.attributes.colours;
	    			break;
	    		case 'tees':
	    			colours = male_answers.tees.attributes.colours;
	    			break;
	    		case 'jumpers':
	    			colours = male_answers.jumpers.attributes.colours;
	    			break;
	    		case 'hoodies':
	    			colours = male_answers.hoodies.attributes.colours;
	    			break;
	    	};


	    	return colours;
	    },

	    getSpecificsFrom: function(category,male_answers) {
	    	var specifics;

	    	switch(category) {
	    		case 'socks':
	    			specifics = male_answers.socks.attributes.specifics;
	    			break;
	    		case 'boxers':
	    			specifics = male_answers.boxers.attributes.specifics;
	    			break;
	    		case 'tees':
	    			specifics = male_answers.tees.attributes.specifics;
	    			break;
	    		case 'jumpers':
	    			specifics = male_answers.jumpers.attributes.specifics;
	    			break;
	    		case 'hoodies':
	    			specifics = male_answers.hoodies.attributes.specifics;
	    			break;
	    	};

	    	// specifics = this.humanizeAnswer(specifics);

	    	return specifics;
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersCheckout','socksCheckout'];

	return checkoutLoader;
}]);