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
		$scope.question = "Hi, I’m M.A.L.E. the Masculine Algorithmic Learning Engine. I’m your digital wingman. Let me know your wardrobe needs and I’ll hook you up. Capiche?";

	    $scope.answers = [
	        {
	          path: "/section/garms/category/socks/question/brands",
	          question: "restart", // when you click on this button, which question to go to
	          category: "intro",
	          cssClass: "socks",
	          label: "socks"
	        },
	        {
	          path: "/section/garms/category/boxers/question/brands",
	          question: "restart", // when you click on this button, which question to go to
	          category: "intro",
	          cssClass: "boxers",
	          label: "pants"
	        },
	        {
	          path: "/section/garms/category/tees/question/brands",
	          question: "restart", // when you click on this button, which question to go to
	          category: "intro",
	          cssClass: "tees",
	          label: "t-shirts"
	        },
	        {
	          path: "/section/garms/category/jumpers/question/brands",
	          question: "restart", // when you click on this button, which question to go to
	          category: "intro",
	          cssClass: "jumpers",
	          label: "jumpers"
	        },
	        {
	          path: "/section/garms/category/hoodies/question/brands",
	          question: "restart", // when you click on this button, which question to go to
	          category: "intro",
	          cssClass: "hoodies",
	          label: "hoodies"
	        }
	        // {
	        //   path: "/section/garms/category/shoes/question/brands",
	        //   question: "restart", // when you click on this button, which question to go to
	        //   category: "intro",
	        //   cssClass: "shoes",
	        //   label: "shoes"
	        // },
	        // {
	        //   path: "/section/garms/category/other/question/brands",
	        //   question: "restart", // when you click on this button, which question to go to
	        //   category: "intro",
	        //   cssClass: "other",
	        //   label: "other"
	        // }
	        
	    ];
	  } else {
	    
	    // another language
	  }

	  $scope.totalNumButtons = $scope.answers.length;


}
CategoryController.$inject = ['$scope','$routeParams','questionLoader','$locale','$location'];