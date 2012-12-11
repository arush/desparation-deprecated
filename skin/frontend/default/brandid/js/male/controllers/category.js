function CategoryController($scope,$routeParams,questionLoader,$locale,$location) {

	/**
	*  Controller Properties
	*/

	//use the correct template
	$scope.categoryTemplate = 'section/' + $routeParams.section + '/category/' + $routeParams.category +'.html';
	

	$scope.selectItem = function (indexOfItemToSelect) {
		
		// NB: if the user does this multiple times, their configuredItems list keeps growing

		var hasChosenThisAlready = false;

		// this is the item category they've chosen. Extracting into a variable for legibility
		var chosenCategory = $scope.answers[indexOfItemToSelect].category;


		/* USE THE FOREACH IF YOU WANT SHOPPING BASKET FUNCTIONALITY */

		// angular.forEach($scope.menu[1].submenuItems, function(submenuItem) {
	 //      if (item.category === chosenCategory) hasChosenThisAlready = true;
	 //      return;
	 //    });
// 		if(!hasChosenThisAlready) $scope.chosenItems.push($scope.answers[indexOfItemToSelect]);

		/* JUST CLEAR THE SHOPPING BASKET AND REPLACE WITH CHOSEN ITEM IF YOU CAN ONLY SHOP FOR ONE THING AT A TIME */

		$scope.menu[0].submenuItems = [];
		$scope.menu[0].submenuItems.push($scope.answers[indexOfItemToSelect]);



		var newPath = $scope.answers[indexOfItemToSelect].path;
		$location.path(newPath);


	}


	$locale.id = "en-gb";

	// TODO: put these in a .json file and retrieve via AJAX

	if ($locale.id == 'en-gb') {
		$scope.question = "I'm M.A.L.E. (Masculine Algorithmic Learning Engine). I do all the hard work around here.\n\nLet me know what you're in the market for, and I'll hook you the F up.";

	    $scope.answers = [
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/socks/question/brands",
	          category: "socks",
	          cssClass: "socks",
	          label: "socks"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/boxers/question/brands",
	          category: "boxers",
	          cssClass: "boxers",
	          label: "pants"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/tees/question/brands",
	          category: "tees",
	          cssClass: "tees",
	          label: "t-shirts"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/jumpers/question/brands",
	          category: "jumpers",
	          cssClass: "jumpers",
	          label: "jumpers"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/hoodies/question/brands",
	          category: "hoodies",
	          cssClass: "hoodies",
	          label: "hoodies"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/shoes/question/brands",
	          category: "shoes",
	          cssClass: "shoes",
	          label: "shoes"
	        },
	        {
	          link: "#/section/garms/category/intro",
	          path: "/section/garms/category/other/question/brands",
	          category: "other",
	          cssClass: "other",
	          label: "other"
	        }
	        
	    ];
	  } else {
	    
	    // another language
	  }



}
CategoryController.$inject = ['$scope','$routeParams','questionLoader','$locale','$location'];