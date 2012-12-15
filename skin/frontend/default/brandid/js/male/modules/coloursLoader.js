
/* Here we are defining a global variable Colours so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of colours depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of colours from
 * an external data source if we wanted.
 **/

var Colours = angular.module('ColoursModule', []);

Colours.factory('coloursLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var coloursLoader = {

    	// this is used to sort arrays of objects
    	dynamicSort: function(property) {
		    return function (a,b) {
		        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		    }
		},

		getQuestion: function(countryCode) {
			var question = {
				"en-gb": "Disco or classic, spots or stripes, patterned or graphic, or just plain old plain? We’ve got the full spectrum buddy. And if we show you any colours you’d never wear, ever. Just hit delete."
			}
			return question[countryCode];
		},

		getQuestionTitle: function(countryCode) {
			var questionTitle = {
				"en-gb": "What colours, chief?"
			}
			return questionTitle[countryCode];
		},

		getTooltip: function(countryCode) {
			var tooltip = {
				"en-gb": "This is a tooltip"
			}
			return tooltip[countryCode];
		},

		getColours: function(category, countryCode) {

	    	var colours = [];

	    	switch(category) {
		    	
		    	case "socks":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	case "boxers":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	case "tees":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	case "jumpers":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	case "hoodies":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	case "shoes":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		var moreColours = this.getClassicColoursAll(countryCode)
		    		
		    		colours.concat(moreColours);
		    		break;
		    	case "other":
		    		colours = this.getDiscoColoursAll(countryCode);
		    		colours.concat(this.getClassicColoursAll(countryCode));
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used

		    		break;
		    }

		    return colours;

	    },

	    getDiscoColoursAll: function(countryCode) {
	    	var discoColoursAll = {
	    			"en-gb": [
	    				"red",
	    				"green",
	    				"pink",
	    				"orange",
	    				"blue",
	    				"yellow",
	    				"purple",
	    				"multi-coloured",
	    				"stripes",
	    				"camo",
	    				"spots",
	    				"chequered"
	    			],
	    			"en-us": [
	    				"red",
	    				"green",
	    				"pink",
	    				"orange",
	    				"blue",
	    				"yellow",
	    				"purple",
	    				"multi-colored",
	    				"stripes",
	    				"camo",
	    				"spots",
	    				"chequered"
	    			]
		    };

		    var discoColoursFiltered = discoColoursAll[countryCode];
		    
			// use the dynamic sort function to order by label field
			discoColoursFiltered.sort();

			// must format this into something SELECT2 understands for tagging
		    var discoColoursFilteredFormatted = this.formatArrayForTagging(discoColoursFiltered);

		    return discoColoursFilteredFormatted;
	    },

	    getClassicColoursAll: function(countryCode) {
	    	var classicColoursAll = {
	    			"en-gb": [
	    				"black",
	    				"white",
	    				"light grey",
	    				"dark grey",
	    				"navy",
	    				"brown"
	    			],
	    			// this is just a joke, but this is how languages are done
	    			"en-us": [
	    				"black",
	    				"white",
	    				"light grey",
	    				"dark grey",
	    				"navy",
	    				"brown"
	    			]
		    };

		    var classicColoursFiltered = classicColoursAll[countryCode];

		    // use the dynamic sort function to order by label field
			classicColoursFiltered.sort();

		    // must format this into something SELECT2 understands for tagging
		    var classicColoursFilteredFormatted = this.formatArrayForTagging(classicColoursFiltered);
		    

		    return classicColoursFilteredFormatted;
	    },

	    formatArrayForTagging: function(nonFormatted) {
	    	var formattedArray = [];

	    	angular.forEach(nonFormatted, function(item) {
	    		
	    		var formattedItem = {
	    			id: item,
	    			text: item
	    		};

	    		formattedArray.push(formattedItem);
	    	});

	    	return formattedArray;

	    },

	    // this is a function used by the "auto-populate colours" buttons

	    getAllColoursFilteredBy: function(style, countryCode) {
	    	var selectedColours = [];

	    	switch(style) {
	    		case 'classic':
	    			selectedColours = this.getClassicColoursAll(countryCode);

	    			break;
	    		case 'disco':
	    			selectedColours = this.getDiscoColoursAll(countryCode);

	    			break;
	    		default:
	    			selectedColours = [];
	    			break;
	    	}

	    	return selectedColours;
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersColours','socksColours'];

	return coloursLoader;
});