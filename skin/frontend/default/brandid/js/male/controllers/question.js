var QuestionController = function QuestionController($scope,$routeParams,DataService,HelperService,$location,$locale) {

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
		DataService.setAnswer($scope.currentAnswer,question,answer);
		
		// if logged in, we want to save to parse
		if($scope.loggedIn) {
			DataService.setAnswer($scope.currentAnswer,"user",$scope.currentUser);
			DataService.saveAnswer($scope.currentAnswer,$scope);
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
				// TODO: where should this go?
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

				questionDecider = 'colours';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'specifics':

				questionDecider = 'specifics';
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'checkout':

				if(!DataService.getCurrentUser()) {
					questionDecider = 'save';
				} else {

					var account_code = $scope.currentUser.get("recurlyAccountCode");
					// check if we already have credit card on file, if so redirect to success page
					if(typeof(account_code) !== "undefined") {
						// TODO: look up valid credit card info from recurly
						questionDecider = 'success';

						var newPath = '/section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/' + questionDecider;
						$location.path(newPath);

						break;

					} else {
						// no credit card on file
						questionDecider = 'checkout';
					}
					
				}
				
				$scope.detailTemplate = 'section/' + $routeParams.section + '/category/generic/question/' + questionDecider + '.html';
				break;
			case 'success':
				questionDecider = 'success';
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
QuestionController.$inject = ['$scope','$routeParams','DataService','HelperService','$location','$locale'];