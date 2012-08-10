// Generated by CoffeeScript 1.3.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.recommend = function() {
    punter.recommended = 'godfather';
    if (punter.roll === 4) {
      punter.recommended = 'soldier';
    } else if (punter.workShirts === false && punter.playShirts === false) {
      punter.recommend = 'boss';
    }
  };

  root.createResult = function() {
    var fbook, fbookHref, maleOutput, percent, play, playTwitter, printResult, q, roll, s, tweet, tweetHref, tweetLink, work;
    s = getLatestSpan();
    $j(s).parent().removeClass('loading-flash');
    work = ["slick suited", "collar poppin'", "laid-back", "hairy"];
    play = [" goodfella", ", polo-wearing high roller", ", tee-wearing rock'n'rolla", " king of rock"];
    playTwitter = [" goodfella", ", polo-wearing high roller", ", tee-wearing rockNrolla", " king of rock"];
    roll = [" that needs a spot to park his jet", " that rolls #LIKEABOSS", " that hates waiting in line", " that's keepin it #lean"];
    if (punter.roll === 1) {
      percent = Math.ceil(Math.random() * 20) + 180;
    } else if (punter.roll === 2) {
      percent = Math.ceil(Math.random() * 55) + 150;
    } else if (punter.roll === 3) {
      percent = Math.ceil(Math.random() * 35) + 120;
    } else {
      percent = Math.ceil(Math.random() * 21) + 104;
    }
    wipeConsole();
    tweetLink = 'http://www.getbrandid.com/get/party/started';
    maleOutput = 'You are a ';
    tweet = 'I\'m a ';
    if (punter.play === 1) {
      maleOutput += 'bonafide, ';
      tweet += 'bonafide, ';
    }
    maleOutput += work[punter.work - 1] + play[punter.play - 1] + roll[punter.roll - 1] + '. You are ' + percent + '% man.';
    tweet += work[punter.work - 1] + playTwitter[punter.play - 1] + roll[punter.roll - 1] + '. I\'m ' + percent + '% man.';
    fbook = tweet;
    tweet += ' How man are you? Ask MALE ' + tweetLink;
    tweetHref = 'http://twitter.com/home/?status=' + encodeURIComponent(tweet);
    fbookHref = 'http://www.facebook.com/dialog/feed?\
	  					app_id=288271097870534&\
	  					link=' + tweetLink + '&\
	  					picture=http://www.getbrandid.com/brandid-square-big.png&\
	  					name=' + encodeURIComponent(fbook) + '&\
	  					caption=' + encodeURIComponent('How man are you? Stop face-stalking for a second and take the M.A.L.E. test') + '&\
	  					description=' + encodeURIComponent('Brought to you by the fine folks at BRANDiD - Shop. Like a Man.') + '&\
	  					redirect_uri=http://www.getbrandid.com/get/party/started';
    q = 'M.A.L.E. COMPUTATIONAL OUTPUT:\n\n';
    newQ(q);
    typeit();
    printResult = function() {
      return jqconsole.Write(maleOutput, 'jqconsole-output green wordwrap');
    };
    setTimeout(printResult, 1000);
    return setTimeout((function() {
      insertShare("twitter", tweetHref);
      insertShare("facebook", fbookHref);
      return insertContinue("window.location = '/plans.html'", "show me my recommended plan");
    }), 3500);
  };

}).call(this);