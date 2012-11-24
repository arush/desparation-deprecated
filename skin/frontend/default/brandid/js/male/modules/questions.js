
/* Here we are defining a global variable Questions so we can extend it with factory methods in other files.
 * This allows us to make question sets in separate files and make the main colleciton of questions depend on them
 *
 *
 **/

var Questions = angular.module('QuestionsModule', []);

Questions.factory('questionLoader', function(BoxersQuestions) {
    
	/* This factory method returns an object that is accessible to the controller which it is injected into.
	 * Here we define the object including its own methods.
	 **/

    var questionLoader = {

    	getQuestions: function() {

	    	var thing = [{
		        id: "1",
		        question: "this is a hardcoded question",
		        type: "picture question"
		      }];
		    return thing;
	    }
	}

	/* This factory method is dependent on other factory methods as declared in function(...here...).
	 * We must inject these dependencies as strings so the file can be minified
	 **/

	questionLoader.$inject = ['BoxersQuestions'];

	return questionLoader;
});

