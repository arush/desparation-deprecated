function QuestionController($scope,$routeParams,DataService,questionLoader,brandsLoader,$location,$locale) {

	// M.A.L.E. speaking
	setTimeout(function() {jQuery('.question').typewriter();},500);
	
	/***** CONTROLLER PROPERTIES ******/


		// TODO: figure out exchange rate functionality

		$scope.currencySymbol = "£";
		$scope.routeParams = $routeParams;
		$locale.id = "en-gb";
		$scope.detailTemplate;
		

	/***** END CONTROLLER PROPERTIES ******/



	// ***** CONTROLLER FUNCTIONS ***** //

	$scope.init = function() {
		$scope.loadCorrectTemplate();
	}


    $scope.goToNextQuestion = function(section,category,question,answer) {

    	// save the answer to browser memory
		// $scope.user.male_answers[section][category][question] = answer;
		$scope.male_answers[category].set(question,answer);

		
		// if logged in, we want to save to parse
		if($scope.loggedIn) {
			DataService.saveAnswer($scope.male_answers[category]);
		};
		
    	var nextPath = $scope.getNextPath(question);
    	$location.path(nextPath);
      

    }

    $scope.getNextPath = function(question) {

    	// this is our crappy state machine
    	// TODO: extract this into a service
    	var questionRouter = '';

		switch(question) {
			case 'start':
				questionRouter = 'brands';
				break;
			case 'brands':
				if($routeParams.category === "socks") {
					questionRouter = 'colours';
				} else {
					questionRouter = 'size';	
				}
				break;
			case 'size':
				questionRouter = 'colours';
				break;
			case 'colours':
				questionRouter = 'specifics';
				break;
			case 'specifics':
				questionRouter = 'checkout';
				break;
			default:
				// or dashboard
				questionRouter = $routeParams.question;
				break;
		}
		
		var nextQuestionPath = 'section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/' + questionRouter;

    	return nextQuestionPath;

    }

    // assuming url begins at /section/garms/category/:category/start
	$scope.loadCorrectTemplate = function() {

	
		var questionDecider = '';

		switch($routeParams.question) {
			case 'start':
				// send to first question
			case 'brands':

				// set generic brands template
				questionDecider = 'brands';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'size':
				// set generic size template
				questionDecider = 'size';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'colours':
				// set generic size template
				questionDecider = 'colours';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'specifics':
				// set generic size template
				questionDecider = 'specifics';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;

			default:
				// or dashboard
				questionDecider = $routeParams.question;
				break;
		}
	}

    // ***** END QUESTION RELATED FUNCTIONS ***** //

	
	$scope.init();

}
QuestionController.$inject = ['$scope','$routeParams','DataService','questionLoader','brandsLoader','$location','$locale'];