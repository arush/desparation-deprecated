
/* Here we are defining a global variable Brands so we can extend it with factory methods in other files.
 * This allows us to make brand sets in separate files and make the main colleciton of brands depend on them if we want
 * But here we've just included all the brand sets in one file for simplicity. We could retrieve the list of brands from
 * an external data source if we wanted.
 **/

var Brands = angular.module('BrandsModule', []);

Brands.factory('brandsLoader', function() {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var brandsLoader = {

    	// this is used to sort arrays of objects
    	dynamicSort: function(property) {
		    return function (a,b) {
		        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		    }
		},

    	getValueBrands: function(category) {

	    	var lowerPriceRange, upperPriceRange;

	    	switch(category) {
		    	
		    	case "socks":
		    		lowerPriceRange = 3.0;
		    		upperPriceRange = 5.0;
		    		break;
		    	case "boxers":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 20.0;
		    		break;
		    	case "tees":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "jumpers":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "hoodies":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "shoes":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "other":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    }

	    	var valueBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		brands: [
		    		{
		    			id: "zalue1",
		    			text: "zalue1"
		    		},
		    		{
		    			id: "value2",
		    			text: "value2"
		    		},
		    		{
		    			id: "value3",
		    			text: "value3"
		    		},
		    		{
		    			id: "value4",
		    			text: "value4"
		    		},
		    		{
		    			id: "value5",
		    			text: "value5"
		    		},
		    		{
		    			id: "value6",
		    			text: "value6"
		    		},
		    		{
		    			id: "value7",
		    			text: "value7"
		    		},
		    		{
		    			id: "value8",
		    			text: "value8"
		    		}
			    ]
			};

			// use the dynamic sort function to order by text field
			
			valueBrands.brands.sort(this.dynamicSort("text"));

		    return valueBrands;	
	    },

	    getPremiumBrands: function(category) {

	    	var lowerPriceRange, upperPriceRange;

	    	switch(category) {
		    	
		    	case "socks":
		    		lowerPriceRange = 8.0;
		    		upperPriceRange = 12.0;
		    		break;
		    	case "boxers":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "tees":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "jumpers":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "hoodies":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "shoes":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "other":
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used
		    		lowerPriceRange = 10.0;
		    		upperPriceRange = 40.0;
		    		break;
		    }

	    	var premiumBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		brands: [
		    		{
		    			id: "premium1",
		    			text: "premium1"
		    		},
		    		{
		    			id: "premium2",
		    			text: "premium2"
		    		},
		    		{
		    			id: "premium3",
		    			text: "premium3"
		    		},
		    		{
		    			id: "premium4",
		    			text: "premium4"
		    		},
		    		{
		    			id: "premium5",
		    			text: "premium5"
		    		},
		    		{
		    			id: "premium6",
		    			text: "premium6"
		    		},
		    		{
		    			id: "premium7",
		    			text: "premium7"
		    		},
		    		{
		    			id: "premium8",
		    			text: "premium8"
		    		}
			    ]
			};

			// use the dynamic sort function to order by text field

			premiumBrands.brands.sort(this.dynamicSort("text"));


		    return premiumBrands;	
	    }
	}

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersBrands','socksBrands'];

	return brandsLoader;
});

