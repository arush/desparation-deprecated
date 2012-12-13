
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
		    console.log(colours);
		    console.log(moreColours);

		    return colours;

	    },

	    getDiscoColoursAll: function(countryCode) {
	    	var discoColoursAll = {
	    			"en-gb": [
	    				"pink",
	    				"orange",
	    				"blue",
	    				"yellow",
	    				"stripes",
	    				"camouflage"
	    			],
	    			"en-us": [
	    				"khaki",
	    				"mauve",
	    				"chequered",
	    				"camo"
	    			]
		    };

		    var discoColoursFiltered = discoColoursAll[countryCode];
		    
			// use the dynamic sort function to order by label field
			discoColoursFiltered.sort();

		    return discoColoursFiltered;
	    },

	    getClassicColoursAll: function(countryCode) {
	    	var classicColoursAll = {
	    			"en-gb": [
	    				"black",
	    				"white",
	    				"light grey",
	    				"dark grey",
	    			],
	    			// this is just a joke, but this is how languages are done
	    			"en-us": [
	    				"sunrise",
	    				"desert",
	    				"dusk",
	    				"mist"
	    			]
		    };

		    var classicColoursFiltered = classicColoursAll[countryCode];
		    
			// use the dynamic sort function to order by label field

		    return classicColoursFiltered;
	    },


	    // this is a function used by the "auto-populate colours" buttons

	    getAllColoursFilteredBy: function(category, style) {
	    	var selectedColours = {};

	    	switch(style) {
	    		case 'classic':
	    			selectedColours = this.getClassicColours(category);
	    			break;
	    		case 'disco':
	    			selectedColours = this.getDiscoColours(category);
	    			break;
	    		default:
	    			selectedColours.colours = [];
	    			break;
	    	}

	    	return JSON.parse(JSON.stringify(selectedColours.colours));
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersColours','socksColours'];

	return coloursLoader;
});