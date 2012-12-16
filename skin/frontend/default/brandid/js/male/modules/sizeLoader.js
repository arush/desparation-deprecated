
/* Here we are defining a global variable Size so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of size depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of size from
 * an external data source if we wanted.
 **/

var Size = angular.module('SizeModule', []);

Size.factory('sizeLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var sizeLoader = {

    	getQuestion: function(countryCode) {
    		var question = {
    			"en-gb": "Are you a big ‘un or a little ‘un? Whatever, we’ve got you covered. Just click the correct box and we’ll make sure it fits."
    		}

    		return question[countryCode];
    	},
    	
    	getQuestionTitle: function(countryCode) {
    		var questionTitle = {
    			"en-gb": "Size matters."
    		}
    		return questionTitle[countryCode];
    	},

		getSizes: function(category,countryCode) {

	    	var sizeOptions;
	    	var instructionsText;

	    	switch(category) {
		    
		    	case "boxers":
		    		sizeOptions = this.getBoxerSizes();
		    		instructionsText = this.getBoxerInstructions(countryCode);
		    		break;
		    	case "tees":
		    		sizeOptions = this.getTopSizes();
		    		instructionsText = this.getTopsInstructions(countryCode);
		    		break;
		    	case "jumpers":
		    		sizeOptions = this.getTopSizes();
		    		instructionsText = this.getTopsInstructions(countryCode);
		    		break;
		    	case "hoodies":
		    		sizeOptions = this.getTopSizes();
		    		instructionsText = this.getTopsInstructions(countryCode);
		    		break;
		    	case "shoes":
		    		sizeOptions = this.getShoeSizes();
		    		instructionsText = "";
		    		break;
		    	case "other":
		    		sizeOptions = this.getOtherSizes();
		    		instructionsText = "";
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used
		    		sizeOptions = this.getBoxerSizes();
		    		break;
		    }


			var sizes = {
	    		instructions: instructionsText,
	    		sizeChoices: sizeOptions
			}

		    return sizes;	
	    },

	    getBoxerInstructions: function(countryCode) {
	    	var localInstructionsText;

	    	if(countryCode === "en-gb"){
		    	localInstructionsText = "If you're unsure what size pants are required for a dude of your standing, just measure your... waist. Yep, your waist. Failing that, check the label in your jeans.";
		    } else{
		    	//another language
		    }

		    return localInstructionsText;

	    },
	    getTopsInstructions: function(countryCode) {
	    	var localInstructionsText;
	    	
	    	if(countryCode === "en-gb"){
		    	localInstructionsText = "If you're unsure how big a dog you are, just measure all the way around that manly chest from pit-to-pit.";
		    } else{
		    	//another language
		    }

		    return localInstructionsText;
	    },

	    getBoxerSizes: function() {
	    	var boxerSizes = [
		    		{
		    			label: "S",
		    			measurements: "30 - 32in",
		    			isActive: false
		    		},
		    		{
		    			label: "M",
		    			measurements: "30 - 34in",
		    			isActive: false
		    		},
		    		{
		    			label: "L",
		    			measurements: "34 - 36in",
		    			isActive: false
		    		},
		    		{
		    			label: "XL",
		    			measurements: "36 - 38in",
		    			isActive: false
		    		}
			    ]
			return boxerSizes;
	    },
	    getTopSizes: function() {
	    	var topSizes = [
		    		{
		    			label: "S",
		    			measurements: "36 - 38in",
		    			isActive: false
		    		},
		    		{
		    			label: "M",
		    			measurements: "38 - 40in",
		    			isActive: false
		    		},
		    		{
		    			label: "L",
		    			measurements: "40 - 42in",
		    			isActive: false
		    		},
		    		{
		    			label: "XL",
		    			measurements: "42 - 44in",
		    			isActive: false
		    		}
			    ]
			return topSizes;
	    },
	    getShoeSizes: function() {
	    	var shoeSizes = [
		    		{
		    			label: "UK 6",
		    			measurements: "EU 40",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 7",
		    			measurements: "EU 41",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 8",
		    			measurements: "EU 42",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 9",
		    			measurements: "EU 43",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 10",
		    			measurements: "EU 44",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 11",
		    			measurements: "EU 45",
		    			isActive: false
		    		},
		    		{
		    			label: "UK 12",
		    			measurements: "EU 46",
		    			isActive: false
		    		}

			    ]
			return shoeSizes;
	    }

	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersSize','socksSize'];

	return sizeLoader;
});