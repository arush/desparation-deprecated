function QuestionController($scope,$routeParams,questionLoader,brandsLoader,$location,$locale) {

	
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
		$scope.user.male_answers[section][category][question] = answer;

    	// and if the user is logged in, save overwriting old data
    	if($scope.currentUser) {
    		// for readability
    		var objectToSave = $scope.user.male_answers;
    		console.log(objectToSave);
    		$scope.currentUser.set("male_answers",objectToSave);

    		console.log($scope.currentUser);

    		$scope.currentUser.save(null, {
			  success: function(user) {
			    // The object was saved successfully.
			    $scope.currentUser.fetch({
				  success: function(myObject) {
				    // The object was refreshed successfully.
				    alert('fetched successfully')
				    console.log(myObject);
				  },
				  error: function(myObject, error) {
				    // The object was not refreshed successfully.
				    // error is a Parse.Error with an error code and description
				    console.log(error);
				  }
				});

			    // console.log(user);

			  },
			  error: function(user, error) {
			    // The save failed.
			    // error is a Parse.Error with an error code and description.
			    alert("Cannot save right now, try again later");
			    console.log(error);
			  }
			});

    	}
    	

    	
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
QuestionController.$inject = ['$scope','$routeParams','questionLoader','brandsLoader','$location','$locale'];