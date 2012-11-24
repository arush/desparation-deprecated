
/**
 * Boxers Questions
 * 
 */

Questions.factory('boxersQuestions', function(){
    
  var boxersQuestions = [{
      id: "1",
      question: "this is a boxers question",
      type: "picture question"
    },
    {
      id: "2",
      question: "this is a another boxers question",
      type: "picture question"
    }

    ];

    // The factory function returns BoxersQuestions, which is injected into controllers.
    return boxersQuestions;
});
