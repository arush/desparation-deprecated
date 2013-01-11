var SuccessFormController = function SuccessFormController($scope,DataService,HelperService,$routeParams,$locale,successLoader,basketLoader) {

	/**
	*  Controller Properties
	*/

	// need to define this up here first so they can be used in the promise closure below
	var all_user_answers;
	var currentAnswer = $scope.currentAnswer;
	$scope.basket = {};
	
	// TODO: should we set male_answers here?
	// NB we are not using $scope.male_answers because there is a chance it could be asyncronously fetching from DB at this very moment
	
	// basket title
	$scope.basketTitle = basketLoader.getBasketTitle($locale.id);

	// success title
	$scope.successTitle = successLoader.getSuccessTitle($locale.id);

	// success copy
	$scope.successCopy = successLoader.getSuccessCopy($locale.id);


	// fetch collection of answers for the user
	var promise = DataService.getUserAnswers($scope.currentUser,$scope);

	promise.then(function(answers) {

	    all_user_answers = answers;
	    currentAnswer = all_user_answers.getByCategory($routeParams.category);

    	// make human readable answers, we made this non-default because the raw basket can be used
		if(typeof(currentAnswer.get("brands")) !== "undefined") {
			$scope.basket.brands = basketLoader.humanizeAnswer(currentAnswer.get("brands"));
			// $scope.basket.brands = basketLoader.taggerize(currentAnswer.get("brands"));
		};

		if(typeof(currentAnswer.get("colours")) !== "undefined") {
			$scope.basket.colours = basketLoader.humanizeAnswer(currentAnswer.get("colours"));
		};

		if(typeof(currentAnswer.get("size")) !== "undefined") {
			$scope.basket.size = basketLoader.humanizeSize(currentAnswer.get("size"));
		};

		$scope.basket.specifics = currentAnswer.get("specifics");


	}, function(reason) {
		// something went wrong in the API call, so init new object
		console.log("Could not fetch users answers collection");
		console.log(reason);
		// male_answers.boxers = new Boxers();
	});

	
	/**
	*  Controller Functions
	*/


};
SuccessFormController.$inject = ['$scope','DataService','HelperService','$routeParams','$locale','successLoader','basketLoader'];
