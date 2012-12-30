
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

		detag: function(allBrands) {
			// turns list of brands in to tag-friendly array
			var returnArray = [];

			// first check how many levels of loops are required

			if(typeof(allBrands[0].data) !== "undefined") {
				for(var c=0; c < allBrands.length; c++) {
					
					var brandsTags = allBrands[c].data.tags;

					for(var i=0; i < brandsTags.length; i++) {
						returnArray.push(brandsTags[i].text);
					};
				};
			} else {
				// single loop level
				for(var i=0; i < allBrands.length; i++) {
					returnArray[i] = allBrands[i].text;
				};
			}
			

			return returnArray;
		},

		taggerize: function(list) {
			// turns list of brands in to tag-friendly array
			var returnArray = [];

			for(var i=0; i < list.length; i++) {
				returnArray[i] = {
					id: list[i],
					isSelected: false,
					text: list[i]
				};
			}

			return returnArray;
		},

		getMyTagsTitle: function(category, countryCode) {
			var suggestionsTitle;

			switch(category) {
		    	
		    	case "socks":
		    		suggestionsTitle = {
		    			"en-gb": "My Sock Brands",
		    			"en-us": "My Sock Brands",
		    		}
		    		break;
		    	case "boxers":
		    		suggestionsTitle = {
		    			"en-gb": "My Boxer Brands",
		    			"en-us": "My Boxer Brands",
		    		}
		    		break;
		    	case "tees":
		    		suggestionsTitle = {
		    			"en-gb": "My T-Shirt Brands",
		    			"en-us": "My T-Shirt Brands",
		    		}
		    		break;
		    	case "jumpers":
		    		suggestionsTitle = {
		    			"en-gb": "My Jumper Brands",
		    			"en-us": "My Jumper Brands",
		    		}
		    		break;
		    	case "hoodies":
		    		suggestionsTitle = {
		    			"en-gb": "My Hoodie Brands",
		    			"en-us": "My Hoodie Brands",
		    		}
		    		break;
		    	case "shoes":
		    		suggestionsTitle = {
		    			"en-gb": "My Shoe Brands",
		    			"en-us": "My Shoe Brands",
		    		}
		    		break;
		    	case "other":
		    		suggestionsTitle = {
		    			"en-gb": "My Brands",
		    			"en-us": "My Brands"
		    		}
		    		break;
		    	default:
		    	// this is just a catchall and should never have to be used
		    		suggestionsTitle = {
		    			"en-gb": "My Brands",
		    			"en-us": "My Brands"
		    		}
		    		break;
		    };

			return suggestionsTitle[countryCode];
		},

		getSuggestionsTitle: function(countryCode) {
			var suggestionsTitle = {
	    			"en-gb": "Suggested Brands",
	    			"en-us": "Suggested Brands"
		    };

			return suggestionsTitle[countryCode];
		},

		getQuestionTitle: function(countryCode) {
			var questionTitle = {
	    			"en-gb": "What's your Brand iD?",
	    			"en-us": "What's Your Brand iD?"
		    };

			return questionTitle[countryCode];

		},

		getTooltip: function(countryCode) {
			var tooltip = {
				"en-gb": "Type in your favourite brand and we’ll make sure you get it. 100% guaranteed.",
				"en-us": "Type in your favourite brand and we’ll make sure you get it. 100% guaranteed."
			};
			
			return tooltip[countryCode];

		},

		getQuestion: function(countryCode) {
			var question = {
	    			"en-gb": "Ok, this is as hard as it’s going to get. Select the brands your wallet likes the look of and we’ll make sure to serve them up in your email.",
	    			"en-us": "What's Your Brand iD?"
		    };

			return question[countryCode];
		},

		getBrands: function(category,countryCode) {

			var allBrands = [
				
				{
					label:"High St",
					data: this.getValueBrands(category,countryCode)
				},
				{
					label:"Luxe",
					data: this.getPremiumBrands(category,countryCode)
				},
				{
					label:"Skate / Snow",
					data: this.getSkateBrands(category,countryCode)
				}

			];

			// taggerize
			for(var i=0; i < allBrands.length; i++) {
			
				// save raw list in local variable because we refer to it multiple times
				var list = allBrands[i].data.tags;
				
				allBrands[i].data.tags = this.taggerize(angular.copy(list));
			};

			return allBrands;

		},

		getBrandsList: function(category,countryCode) {
			var allBrands = this.getBrands(category,countryCode);

			var brandsList = [];

			for(var i=0; i < allBrands.length; i++) {
			
				// save raw list in local variable because we refer to it multiple times
				var list = allBrands[i].data.tags;
				
				brandsList = brandsList.concat(angular.copy(list));
			};

			return brandsList;

		},

		setSelected: function(allBrands, selectedTags) {

			// set default selected tags

			for(var cc=0; cc < allBrands.length; cc++) {

				var brandsTags = allBrands[cc].data.tags;

				for(var i=0; i < brandsTags.length; i++) {
				
					var foundNum = 0;

					for(var c=0; c < selectedTags.length; c++) {
						if(brandsTags[i].id === selectedTags[c].id) {
							brandsTags[i].isSelected = true;
							foundNum++;
						}
					}

					if(foundNum === selectedTags.length) {
						return;
					}

				};

			};
		},

		// find a tag within allBrands and toggle its selection

		toggleSelect: function(allBrands, tagId) {
			// deselect a single tag
			for(var cc=0; cc < allBrands.length; cc++) {

				var brandsTags = allBrands[cc].data.tags;

				for(var i=0; i < brandsTags.length; i++) {
				
					// does it match?
					if(brandsTags[i].id === tagId) {
						brandsTags[i].isSelected = !brandsTags[i].isSelected;
						
						// exit the function
						return;
					}

				};

			};
		},


		getSkateBrands: function(category,countryCode) {

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

		    var rawBrands = {
				"en-gb": ["Etnies","Element","DC","Vans","WeSC","SupremeBeing","Famous Stars & Straps","Zoo York"],
				"en-us": ["Etnies","Element","DC","Vans","WeSC","SupremeBeing","Famous Stars & Straps","Zoo York"]
			};

	    	var skateBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		tags: rawBrands[countryCode]
			};

			// use the dynamic sort function to order by text field

			// skateBrands.brands.sort();

		    return skateBrands;	
	    },

    	getValueBrands: function(category,countryCode) {

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

		    var rawBrands = {
				"en-gb": ["ASOS","Pringle","River Island","American Apparel","Next","M&S","Topman","Zara","UniQlo","Muji","Esprit","Benetton"],
				"en-us": ["ASOS","Pringle","River Island","American Apparel","Next","M&S","Topman","Zara","UniQlo","Muji","Esprit","Benetton"]
			};

	    	var valueBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		tags: rawBrands[countryCode]
			};

			// use the dynamic sort function to order by text field

			// valueBrands.tags.sort();

		    return valueBrands;	
	    },

	    getPremiumBrands: function(category,countryCode) {

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

		    var rawBrands = {
				"en-gb": ["Ralph Lauren","French Connection","Paul Smith","Ted Baker","Lyle & Scott","Calvin Klein","Hugo Boss","Abercombie & Fitch","Diesel","Armani","Superdry","All Saints","Fred Perry","G-Star","Franklin & Marshall","Reiss"],
				"en-us": ["Ralph Lauren","French Connection","Paul Smith","Ted Baker","Lyle & Scott","Calvin Klein","Hugo Boss","Abercombie & Fitch","Diesel","Armani","Superdry","All Saints","Fred Perry","G-Star","Franklin & Marshall","Reiss"]
			};

		    var premiumBrands = 

	    	{
	    		priceRange: {
	    			upper: upperPriceRange,
	    			lower: lowerPriceRange
	    		},
	    		tags: rawBrands[countryCode]
			};

			// use the dynamic sort function to order by text field

			// premiumBrands.tags.sort();

		    return premiumBrands;	
	    },


	};

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	// brandLoader.$inject = ['boxersBrands','socksBrands'];

	return brandsLoader;
});