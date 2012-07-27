// Generated by CoffeeScript 1.3.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.rollQ = function() {
    var q, s;
    wipeConsole();
    saveProgress("rollQ");
    q = "How do you roll? ";
    newQ(q);
    typeit();
    s = $j("#male-welcome-msg");
    return rollImages(s);
  };

  root.rollDone = function() {
    newQ("All good. Let's save your progress again. ");
    typeit();
    return setTimeout((function() {
      return insertContinue("emailPrompt(punter.email)", "save progress");
    }), 1500);
  };

  root.rollAa = function() {
    punter.roll = "private jet";
    wipeConsole();
    return rollDone();
  };

  root.rollAb = function() {
    punter.roll = "business class";
    wipeConsole();
    return rollDone();
  };

  root.rollAc = function() {
    punter.roll = "economy";
    wipeConsole();
    return rollDone();
  };

  root.rollAd = function() {
    punter.roll = "bus";
    wipeConsole();
    return rollDone();
  };

}).call(this);
