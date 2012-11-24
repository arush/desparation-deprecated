
/**
 * Socks Questions
 * 
 */

Questions.factory('socksQuestions', function(){
    
  var socksQuestions = [{
      id: "1",
      question: "this is a socks question",
      type: "picture question",
      templatePath: "garms/socks/1.html"
    },
    {
      id: "2",
      question: "this is a another socks question",
      type: "picture question",
      templatePath: "garms/socks/2.html"
    }];

    // The factory function returns SocksQuestions, which is injected into controllers.
    return socksQuestions;
});
