var CheckoutFormController = function CheckoutFormController($scope,DataService,HelperService,$routeParams,$locale,checkoutLoader) {

	/**
	*  Controller Properties
	*/

	// need to define this up here first so they can be used in the promise closure below
	
	// TODO: should we set male_answers here?
	// NB we are not using $scope.male_answers because there is a chance it could be asyncronously fetching from DB at this very moment
	var all_user_answers;
	var currentAnswer = $scope.currentAnswer;
	$scope.basket = {};

	// basket title
	$scope.basketTitle = checkoutLoader.getBasketTitle($locale.id);


		// fetch collection of answers for the user
		var promise = DataService.getUserAnswers($scope.currentUser,$scope);

		promise.then(function(answers) {

	    all_user_answers = answers;
	    currentAnswer = all_user_answers.getByCategory($routeParams.category);

	    // make human readable answers, we made this non-default because the raw basket can be used
		  if(typeof(currentAnswer.get("brands")) !== "undefined") {
				$scope.basket.brands = checkoutLoader.humanizeAnswer(currentAnswer.get("brands"));
		  };

			if(typeof(currentAnswer.get("colours")) !== "undefined") {
				$scope.basket.colours = checkoutLoader.humanizeAnswer(currentAnswer.get("colours"));
			};

			if(typeof(currentAnswer.get("size")) !== "undefined") {
				$scope.basket.size = checkoutLoader.humanizeSize(currentAnswer.get("size"));
			};

			$scope.basket.specifics = currentAnswer.get("specifics");


	  }, function(reason) {
	    // something went wrong in the API call, so init new object
	    console.log("Could not fetch users answers collection");
	    console.log(reason);
	    // male_answers.boxers = new Boxers();
	  });

	// checkout title
	$scope.checkoutTitle = checkoutLoader.getCheckoutTitle($locale.id);

	// checkout copy
	$scope.checkoutCopy = checkoutLoader.getCheckoutCopy($locale.id);

	// gloves image
	$scope.checkoutIncentiveUrl = checkoutLoader.getCheckoutIncentiveUrl($locale.id);

	var environment = HelperService.getEnvironment();
	var liveOrDevUrl;
	
	if(environment === "www") {
		liveOrDevUrl = "brandid";
	} else {
		liveOrDevUrl = "hackbrandid";
	}

	$scope.paymentPageUrl = "https://" + liveOrDevUrl + ".recurly.com/subscribe/onboardfee";


	/**
	*  Controller Functions
	*/

	// track
	var metricsPayload = {"B4.0_Funnel": $routeParams.category, "B4.0_Step": "£1 Checkout"};
    HelperService.metrics.track('B4.0_Reached Funnel Step', metricsPayload);

}
CheckoutFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','checkoutLoader'];
