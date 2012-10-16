function resendConfirmation() {
	if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
		clearMobileButtons();
	jqconsole.Write('Resending confirmation email to '+punter.email+'.\nAdd help@getbrandid.com to your address book to make sure our emails don\'t go to spam.  ', 'jqconsole-output instruction wordwrap');
	registerUser();

}

function confirmationQ() {
	var buttons = new Array();
	
	buttons[0] = new Array("convert secondary","Resend confirmation", "resendConfirmation()");
	
	// not sure this makes sense now
	
	if(punter.progress === 'finalSave') {
		buttons[1] = new Array("convert","OK, I clicked on the link in my email, try again", "finalSave()");
		_kmq.push(['record', 'MALE Tried to continue without confirming email', {'emailAttempt':punter.email}]);
	}
	else {
		buttons[1] = new Array("convert","Continue", "finalSave()");
	}
	_kmq.push(['record', 'MALE Email Confirm Sent', {'emailAttempt':punter.email}]);
	// if(punter.gender === 'Female' && punter.progress !== 'finalSave') {
	// 	buttons[1] = new Array("convert","Continue", "rollQ()");	
	// }
	// else if(punter.progress !== 'finalSave'){
	// 	buttons[1] = new Array("convert","Continue", "magsQ()");	
	// }
	// else {
	// 	buttons[1] = new Array("convert","OK, I clicked on the link in my email, try again", "finalSave()");
	// }//must be the final save
	insertButtons(buttons);
	// confirmationA();
	
}

function insertEmailButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="email-to-save" type="email" name="email" value="Enter your email address…" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleEmailSubmit(); return false;">Save Progress</a>';
	
	string += "</div>";
	
	performAppend(s,string);
}

function insertMagsField() {
	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="mags-to-save" type="text" name="magazines" value="magazine 1, magazine 2..." onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_mags" class="convert" onclick="handleMagsSubmit(); return false;">Feed the M.A.L.E.</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},1500);
}

function insertTvField() {
	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="tv-to-save" type="text" name="tv" value="tv show 1, tv show 2..." onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_tv" class="convert" onclick="handleTvSubmit(); return false;">Feed the M.A.L.E.</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},1500);
}


function startEmail() {
	saveProgress('startEmail');
	wipeConsole();
	var q = 'Cool.\n\nLet\'s save your progress now so you don\'t have to go through this again.\nWhat\'s your email address: ';
	newQ(q);
	adjustHeight('email');
	//typeit();
	insertEmailButton();
}


function handleEmailSubmit() {

		var emailToSave;

		emailToSave = $j('#email-to-save').val();
	 	
		//KISSmetrics
		_kmq.push(['record', 'MALE Email Submitted']);
		_kmq.push(['identify', emailToSave]);

		punter.email = emailToSave;
		punter.goAfterSave = 'finalSave';
		saveProgress('registerUser');
		registerUser();

		$j('.mobile-buttons.saving').remove();
	
}

function handleMagsSubmit() {

		var magsToSave;

		magsToSave = $j('#mags-to-save').val();
	 	
		//KISSmetrics
		_kmq.push(['record', 'MALE Magazines', {'magazines':magsToSave}]);
	 	punter.mags = magsToSave;
		$j('.mobile-buttons.saving').remove();

		return watchQ();
	
}

function handleTvSubmit() {

		var tvToSave;

		tvToSave = $j('#tv-to-save').val();
	 	
		//KISSmetrics
		_kmq.push(['record', 'MALE TV Shows', {'tv':tvToSave}]);
	 	punter.tv = tvToSave;
		$j('.mobile-buttons.saving').remove();

		return startEmail();
	
}