var CategoryController = function CategoryController($scope,HelperService,$routeParams,$locale,$location) {

	/**
	*  Controller Properties
	*/

	// $scope.drawerOpen = !$scope.drawerOpen;

	//use the correct template
	$scope.categoryTemplate = 'section/' + $routeParams.section + '/category/' + $routeParams.category +'.html';
	

	$scope.selectItem = function (indexOfItemToSelect) {
		
		// this is the item category they've chosen. Extracting into a variable for legibility
		var chosenCategory = $scope.answers[indexOfItemToSelect].category;

		var metricsPayload = {"B4.0_Item Name":chosenCategory};
		HelperService.metrics.track("B4.0_Chose Basket Item",metricsPayload);

		/* JUST CLEAR THE submenuItems AND REPLACE WITH CHOSEN ITEM IF YOU CAN ONLY SHOP FOR ONE THING AT A TIME */

		$scope.menu[0].submenuItems = [];
		$scope.menu[0].submenuItems.push($scope.answers[indexOfItemToSelect]);

		var newPath = $scope.answers[indexOfItemToSelect].path;
		$location.path(newPath);

	};


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

	  // M.A.L.E. speaking
	  setTimeout(function() {jQuery('#intro').typewriter();},500);


	// track
	var metricsPayload = {"B4.0_Funnel": "M.A.L.E.","B4.0_Step": "Intro"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);

}
CategoryController.$inject = ['$scope','HelperService','$routeParams','$locale','$location'];