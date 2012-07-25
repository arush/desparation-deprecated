function createPunter() {
	
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
	}
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

    $j.ajax({
	  type: "POST",
	  url: "/get/party/subscribe",
	  data: {
	  	email: punter.email,
	  	fname: punter.fname,
	  	gender: punter.gender,
	  	source: referer
	  },
	  success: function(data) {

		var retval = JSON.parse(data);

		$j(s).parent().removeClass('loading-flash');
		$j(s).parent().removeClass('red');
		
		if(retval.status == 1) {
			// save new requires email confirmation
			$j(s).parent().addClass('instruction');
			$j(s).text(retval.message);
			setTimeout('confirmationQ();',3500);
        }
        else if(retval.status == 2) {
        	// save existing
        	$j(s).parent().addClass('green');
			$j(s).text(retval.message);
			setTimeout('workQ();',1000);
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
 var go = String(punter.progress);
 window[punter.progress](mobile);

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

	// jqconsole.Prompt(true, function (input) {
	// 	switch(input) {
	// 		case 'a':
	// 			dropBackIn(false);
	// 			break;
	// 		case 'b':
	// 			startAgain(false);
	// 			break;
	// 		default:
	// 			jqconsole.Write('What, no [a] and [b] on your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
	// 			typeit();
	// 			setTimeout('returningVisitor();',1500);
	// 			break;
	// 	}
	// });
}