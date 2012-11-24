
/**
 * Boxers Questions
 * 
 */

Questions.factory('boxersQuestions', function(){
    
  var boxersQuestions = [{
      id: "1",
      question: "Size",
      path: "garms/boxers/1"
    },
    {
      id: "2",
      question: "Colours",
      path: "garms/boxers/2"
    }

    ];

    // The factory function returns BoxersQuestions, which is injected into controllers.
    return boxersQuestions;
});
