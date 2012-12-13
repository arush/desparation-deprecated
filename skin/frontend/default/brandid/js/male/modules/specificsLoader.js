
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

		getSpecificsQuestion: function(category,countryCode) {


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
	    			"en-gb": [
	    				"This is for those of you with an eye for detail. It’s where you help us to help you. Really help you. At the micro level. Tell us anything that we need to know about your preferences. Ankle socks or stockings? Woolen or cotton? Sporty or classy? Give us those deets."
	    			],
	    			"en-us": [
	    				"This is for those of you with an eye for detail. It’s where you help us to help you. Really help you. At the micro level. Tell us anything that we need to know about your preferences. Ankle socks or stockings? Woolen or cotton? Sporty or classy? Give us those deets."
	    			]
		    };

		    var socksQuestionFiltered = socksQuestion[countryCode];
		    

		    return socksQuestionFiltered;
	    }

	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersSpecifics','socksSpecifics'];

	return specificsLoader;
});