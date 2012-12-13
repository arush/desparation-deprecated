function QuestionController($scope,$routeParams,questionLoader,brandsLoader,$location,$locale) {

	
	/***** CONTROLLER PROPERTIES ******/


		// TODO: figure out exchange rate functionality

		$scope.currencySymbol = "£";
		$scope.routeParams = $routeParams;
		$locale.id = "en-gb";

	/***** END CONTROLLER PROPERTIES ******/


	/***** FINALISE ROUTING & TEMPLATES *****/

		// assuming url begins at /section/garms/category/:category/start

		var questionDecider = '';

		switch($routeParams.question) {
			case 'start':
				questionDecider = 'brands';
				$routeParams.question = 'brands';
				break;
			default:
				// or dashboard
				questionDecider = $routeParams.question;
				break;
		}
		
		$scope.detailTemplate = 'section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/' + questionDecider + '.html';

	/***** END FINALISE ROUTING & TEMPLATES *****/


	// ***** QUESTION RELATED FUNCTIONS ***** //

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
			    Parse.User.current().fetch({});
			    // console.log(user);
			    alert("saving succeeded");

			  },
			  error: function(user, error) {
			    // The save failed.
			    // error is a Parse.Error with an error code and description.
			    alert("saving failed");
			    console.log(error);
			  }
			});

    	}
    	


    	var questionRouter = '';

		switch(question) {
			case 'start':
				questionRouter = 'brands';
				break;
			case 'brands':
				questionRouter = 'size';
				break;
			case 'size':
				questionRouter = 'size';
				break;
			default:
				// or dashboard
				questionRouter = $routeParams.question;
				break;
		}
		
		var nextQuestionPath = 'section/' + $routeParams.section + '/category/' + $routeParams.category + '/question/' + questionRouter + '.html';


    	$location.path(nextQuestionPath);
      

    }

    // ***** END QUESTION RELATED FUNCTIONS ***** //

	

}
QuestionController.$inject = ['$scope','$routeParams','questionLoader','brandsLoader','$location','$locale'];