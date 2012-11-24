
/**
 * Socks Questions
 * 
 */

Questions.factory('socksQuestions', function(){
    
  var socksQuestions = [{
      id: "1",
      question: "this is a socks question",
      type: "picture question"
    },
    {
      id: "2",
      question: "this is a another socks question",
      type: "picture question"
    }

    ];

    // The factory function returns SocksQuestions, which is injected into controllers.
    return socksQuestions;
});
