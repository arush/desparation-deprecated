
/**
 * Boxers Questions
 * 
 */

Questions.factory('boxersQuestions', function(){
    
  var boxersQuestions = [{
      id: "1",
      controller: "q1Controller",
      question: "Size"
      // templatePath: "garms/boxers/1"
    },
    {
      id: "2",
      controller: "q1Controller",
      question: "Colours"
      // templatePath: "garms/boxers/2"
    }

    ];

    // The factory function returns BoxersQuestions, which is injected into controllers.
    return boxersQuestions;
});
