
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

		getSkateBrands: function(category) {

	    	var lowerPriceRange, upperPriceRange;

	    	switch(category) {
		    	
		    	case "socks":
		    		lowerPriceRange = 2.0;
		    		upperPriceRange = 5.0;
		    		break;
		    	case "boxers":
		    		lowerPriceRange = 8.0;
		    		upperPriceRange = 15.0;
		    		break;
		    	case "tees":
		    		lowerPriceRange = 20.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "jumpers":
		    		lowerPriceRange = 40.0;
		    		upperPriceRange = 80.0;
		    		break;
		    	case "hoodies":
		    		lowerPriceRange = 40.0;
		    		upperPriceRange = 80.0;
		    		break;
		    	case "shoes":
		    		lowerPriceRange = 30.0;
		    		upperPriceRange = 80.0;
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

	    	var skateBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		brands: [
		    		{
		    			id: "Etnies",
		    			text: "Etnies"
		    		},
		    		{
		    			id: "Element",
		    			text: "Element"
		    		},
		    		{
		    			id: "DC",
		    			text: "DC"
		    		},
		    		{
		    			id: "Vans",
		    			text: "Vans"
		    		},
		    		{
		    			id: "WeSC",
		    			text: "WeSC"
		    		},
		    		{
		    			id: "SupremeBeing",
		    			text: "SupremeBeing"
		    		},
		    		{
		    			id: "Famous",
		    			text: "Famous"
		    		},
		    		{
		    			id: "Carhartt",
		    			text: "Carhartt"
		    		},
		    		{
		    			id: "Stussy",
		    			text: "Stussy"
		    		},
		    		{
		    			id: "Zoo York",
		    			text: "Zoo York"
		    		}
			    ]
			};

			// use the dynamic sort function to order by text field

			skateBrands.brands.sort(this.dynamicSort("text"));

		    return skateBrands;	
	    },

    	getValueBrands: function(category) {

	    	var lowerPriceRange, upperPriceRange;

	    	switch(category) {
		    	
		    	case "socks":
		    		lowerPriceRange = 2.0;
		    		upperPriceRange = 5.0;
		    		break;
		    	case "boxers":
		    		lowerPriceRange = 4.0;
		    		upperPriceRange = 7.0;
		    		break;
		    	case "tees":
		    		lowerPriceRange = 5.0;
		    		upperPriceRange = 20.0;
		    		break;
		    	case "jumpers":
		    		lowerPriceRange = 15.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "hoodies":
		    		lowerPriceRange = 20.0;
		    		upperPriceRange = 40.0;
		    		break;
		    	case "shoes":
		    		lowerPriceRange = 20.0;
		    		upperPriceRange = 50.0;
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
		    			id: "asos",
		    			text: "asos"
		    		},
		    		{
		    			id: "Pringle",
		    			text: "Pringle"
		    		},
		    		{
		    			id: "River Island",
		    			text: "River Island"
		    		},
		    		{
		    			id: "American Apparel",
		    			text: "American Apparel"
		    		},
		    		{
		    			id: "Next",
		    			text: "Next"
		    		},
		    		{
		    			id: "M&S",
		    			text: "M&S"
		    		},
		    		{
		    			id: "Topman",
		    			text: "Topman"
		    		},
		    		{
		    			id: "Zara",
		    			text: "Zara"
		    		},
					{
		    			id: "UniQlo",
		    			text: "UniQlo"
		    		},
		    		{
		    			id: "Muji",
		    			text: "Muji"
		    		},
		    		{
		    			id: "Esprit",
		    			text: "Esprit"
		    		},
		    		{
		    			id: "Benetton",
		    			text: "Benetton"
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
		    		lowerPriceRange = 6.0;
		    		upperPriceRange = 15.0;
		    		break;
		    	case "boxers":
		    		lowerPriceRange = 8.0;
		    		upperPriceRange = 15.0;
		    		break;
		    	case "tees":
		    		lowerPriceRange = 20.0;
		    		upperPriceRange = 50.0;
		    		break;
		    	case "jumpers":
		    		lowerPriceRange = 40.0;
		    		upperPriceRange = 90.0;
		    		break;
		    	case "hoodies":
		    		lowerPriceRange = 40.0;
		    		upperPriceRange = 90.0;
		    		break;
		    	case "shoes":
		    		lowerPriceRange = 50.0;
		    		upperPriceRange = 100.0;
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
		    };

		    var premiumBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		brands: [
		    		{
		    			id: "Ralph Lauren",
		    			text: "Ralph Lauren"
		    		},
		    		{
		    			id: "French Connection",
		    			text: "French Connection"
		    		},
		    		{
		    			id: "Paul Smith",
		    			text: "Paul Smith"
		    		},
		    		{
		    			id: "Ted Baker",
		    			text: "Ted Baker"
		    		},
		    		{
		    			id: "Lyle & Scott",
		    			text: "Lyle & Scott"
		    		},
		    		{
		    			id: "Calvin Klein",
		    			text: "Calvin Klein"
		    		},
		    		{
		    			id: "Hugo Boss",
		    			text: "Hugo Boss"
		    		},
		    		{
		    			id: "Abercombie & Fitch",
		    			text: "Abercombie & Fitch"
		    		},
		    		{
		    			id: "Diesel",
		    			text: "Diesel"
		    		},
		    		{
		    			id: "Armani",
		    			text: "Armani"
		    		},
		    		{
		    			id: "Superdry",
		    			text: "Superdry"
		    		},
		    		{
		    			id: "All Saints",
		    			text: "All Saints"
		    		},
		    		{
		    			id: "Fred Perry",
		    			text: "Fred Perry"
		    		},
		    		{
		    			id: "G-Star",
		    			text: "G-Star"
		    		},
		    		{
		    			id: "Franklin & Marshall",
		    			text: "Franklin & Marshall"
		    		},
		    		{
		    			id: "Reiss",
		    			text: "Reiss"
		    		}
			    ]
			};

			// use the dynamic sort function to order by text field

			premiumBrands.brands.sort(this.dynamicSort("text"));


		    return premiumBrands;	
	    },


	    // this is a function used by the "auto-populate brands" buttons

	    getAllBrandsFilteredBy: function(category, brandType) {
	    	var selectedBrands = {};

	    	switch(brandType) {
	    		case 'skate':
	    			selectedBrands = this.getSkateBrands(category);
	    			break;
	    		case 'premium':
	    			selectedBrands = this.getPremiumBrands(category);
	    			break;
	    		case 'value':
	    			selectedBrands = this.getValueBrands(category);
	    			break;
	    		default:
	    			selectedBrands.brands = [];
	    			break;
	    	}

	    	return JSON.parse(JSON.stringify(selectedBrands.brands));
	    }


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersBrands','socksBrands'];

	return brandsLoader;
});