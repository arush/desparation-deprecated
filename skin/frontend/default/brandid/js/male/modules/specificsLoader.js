
/* Here we are defining a global variable Specifics so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of specifics depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of specifics from
 * an external data source if we wanted.
 **/

var Specifics = angular.module('SpecificsModule', []);

Specifics.factory('specificsLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var specificsLoader = {

    	getQuestionTitle: function(countryCode) {
    		var questionTitle = {
    			"en-gb": "What did I miss?"
    		}
    		return questionTitle[countryCode];
    	},

		getQuestion: function(category,countryCode) {


	    	switch(category) {
		    	
		    	case "socks":
		    		specificsQuestion = this.getSocksQuestion(countryCode);
		    		break;
		    	case "boxers":
		    		specificsQuestion = this.getBoxersQuestion(countryCode);
		    		break;
		    	case "tees":
		    		specificsQuestion = this.getTeesQuestion(countryCode);
		    		break;
		    	case "jumpers":
		    		specificsQuestion = this.getJumpersQuestion(countryCode);
		    		break;
		    	case "hoodies":
		    		specificsQuestion = this.getHoodiesQuestion(countryCode);
		    		break;
		    	case "shoes":
		    		specificsQuestion = this.getShoesQuestion(countryCode);
		    		break;
		    	case "other":
		    		specificsQuestion = this.getOtherQuestion(countryCode);
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used
		    		specificsQuestion = this.getOtherQuestion(countryCode);
		    		break;
		    }

		    return specificsQuestion;
	    },

	    getSocksQuestion: function(countryCode) {
	    	var socksQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. It’s where you help us to help you. Ankle socks or stockings? Woolen or cotton? Sporty or classy?",
	    			"en-us": "This is for those of you with an eye for detail. It’s where you help us to help you. Ankle socks or stockings? Woolen or cotton? Sporty or classy?"
		    };

		    return socksQuestion[countryCode];
		},
 
		getBoxersQuestion: function(countryCode) {
	    	var boxersQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. Briefs or boxers? Snug or baggy? Long or longer? Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. Briefs or boxers? Snug or baggy? Long or longer? Give me those deets."
		    };

		    return boxersQuestion[countryCode];
		},

		getTeesQuestion: function(countryCode) {
	    	var teesQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. Slim fit or loose fit? Vee, crew or polo? Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. Slim fit or loose fit? Vee, crew or polo? Give me those deets."
		    };

		    return teesQuestion[countryCode];
		},

		getJumpersQuestion: function(countryCode) {
	    	var jumpersQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. Chunky or fine? Slim fit or loose fit? Vee, crew or turtle? Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. Chunky or fine? Slim fit or loose fit? Vee, crew or turtle? Give me those deets."
		    };

		    return jumpersQuestion[countryCode];
		},

		getHoodiesQuestion: function(countryCode) {
	    	var hoodiesQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. Zip or no zip? Heavyweight, lightweight or featherweight? Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. Zip or no zip? Heavyweight, lightweight or featherweight? Give me those deets."
		    };

		    return hoodiesQuestion[countryCode];
		},

		getShoesQuestion: function(countryCode) {
	    	var shoesQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. Laces or slip-on? Leather, suede or canvas? Low-top or high-top? Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. Laces or slip-on? Leather, suede or canvas? Low-top or high-top? Give me those deets."
		    };

		    return shoesQuestion[countryCode];
		},

		getOtherQuestion: function(countryCode) {
	    	var otherQuestion = {
	    			"en-gb": "This is for those of you with an eye for detail. It’s where you help us to help you. Give me those deets.",
	    			"en-us": "This is for those of you with an eye for detail. It’s where you help us to help you. Give me those deets."
		    };

		    return otherQuestion[countryCode];

	    }

	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersSpecifics','socksSpecifics'];

	return specificsLoader;
});