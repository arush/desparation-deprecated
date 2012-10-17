function createPunter() {
	
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
	}
}

function saveCookieFromString(cookieString) {

	$j.cookie('punter', cookieString, { expires: 1, path: '/' });

	// load punter from cookie
	createPunter();
}

function registerUser() {
	wipeConsole();
	newQ(punter.email+' ');
	$j('#male-welcome-msg').css('color','#444444');

	jqconsole.Write('Saving...  ', 'jqconsole-output loading-flash wordwrap');
	var s = getLatestSpan();
	$j(s).parent().removeClass('red');

	typeit();
	
	var loading = setInterval('typeit();', 2000);
	
	var referer = getReferer();
	// referer = encodeURIComponent(referer);

    $j.ajax({
	  type: "POST",
	  url: "/get/party/subscribe",
	  data: {
	  	email: punter.email,
	  	fname: punter.fname,
	  	gender: punter.gender,
	  	source: referer,
	  	male: punter.maleAnswers
	  },
	  success: function(data) {

		var retval = JSON.parse(data);

		$j(s).parent().removeClass('loading-flash');
		$j(s).parent().removeClass('red');
		
		if(retval.status == 1) {
			// save new requires email confirmation
			$j(s).parent().addClass('instruction');
			
			$j(s).text(retval.message);
			
			setTimeout('confirmationQ();',2500);
        }
        else if(retval.status == 2) {
        	// save existing
        	$j(s).parent().addClass('green');
			
			$j(s).text(retval.message);
			
			setTimeout(function() {
			  return window[punter.goAfterSave]();
			}, 1000);
        }
        else {
			$j(s).parent().addClass('red');
			$j(s).text(retval.message+'\nTry another email address: ');
			insertEmailButton();
        }
		clearInterval(loading);
        typeit();
	  }
	});
}

function finalRegister() {
	var s = getLatestSpan();

	// typeit();
	
	// var loading = setInterval('typeit();', 2000);
	
	var referer = getReferer();
	// referer = encodeURIComponent(referer);

    $j.ajax({
	  type: "POST",
	  url: "/get/party/subscribe",
	  data: {
	  	email: punter.email,
	  	fname: punter.fname,
	  	gender: punter.gender,
	  	source: referer,
	  	male: punter.maleAnswers
	  },
	  success: function(data) {

		var retval = JSON.parse(data);

		$j(s).parent().removeClass('loading-flash');
		$j(s).parent().removeClass('red');
		
		if(retval.status == 1) {
			// save new requires email confirmation
			$j(s).parent().addClass('instruction');
			
			$j(s).text('Go and confirm your email address so I can show you the results');
			
			setTimeout('confirmationQ();',2500);
        }
        else { // if(retval.status == 2) 
        	// save existing
        	$j(s).parent().addClass('green');
			
			$j(s).text('OK! The results are in!');
			setTimeout('createResult()', 1000);
        }
        
		//clearInterval(loading);
        typeit();
	  }
	});
}


function saveProgress(progress) {
	//progress parameter is name of the function of the next step
	punter.progress = progress;

	$j.cookie('punter', JSON.stringify(punter), { expires: 1, path: '/' });
}

function clearProgress() {
	$j.cookie('punter', null, { expires: 1, path: '/' });
	createPunter();
	punter.fname = undefined; //this is as good as deleting punter, but leaves the ability to check against punter.fname later
}

function dropBackIn(mobile) {
if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
 window[punter.progress]();

}

function startAgain(mobile) {
	wipeConsole();
	clearProgress();
	startMale();
}

function returningVisitor() {
	jqconsole.Write('Just to confirm: ', 'jqconsole-output wordwrap');
	typeit();
	jqconsole.Write('a. Yes, it\'s me, '+punter.fname+', lets continue where we left off.\nb. I was just fooling around, let\'s start again.', 'jqconsole-output question wordwrap');
	setTimeout('typeit();',800);

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","I'm not "+punter.fname, "startAgain(true)");
	buttons[1] = new Array("convert","Continue", "dropBackIn(true)");
	insertButtons(buttons);
}