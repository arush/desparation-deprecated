
/**
 * Boxers Questions
 * 
 */

Questions.factory('BoxersQuestions', function(){
    
  var BoxersQuestions = [{
      id: "1",
      question: "this is a question",
      type: "picture question"
    }];

    // The factory function returns BoxersQuestions, which is injected into controllers.
    return BoxersQuestions;
});
