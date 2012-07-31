function resendConfirmation() {
	if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
		clearMobileButtons();
	jqconsole.Write('Resending confirmation email to '+punter.email+'.\nAdd help@getbrandid.com to your address book to make sure our emails don\'t go to spam.  ', 'jqconsole-output instruction wordwrap');
	registerUser();

}

function confirmationQ() {
	jqconsole.Write('a. I didn\'t get any email\nb. I clicked confirm, let\'s continue. ', 'jqconsole-output question wordwrap');
	typeit();

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","Resend confirmation", "resendConfirmation()");
	
	if(punter.gender === 'Female') {
		buttons[1] = new Array("convert","Continue", "giftQ()");	
	}
	else {
		buttons[1] = new Array("convert","Continue", "workQ()");	
	}
	
	insertButtons(buttons);
	// confirmationA();
	
}

function insertEmailButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="email-to-save" type="email" name="email" value="Enter your email address…" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleEmailSubmit(); return false;">Save Progress</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
}


function startEmail() {
	saveProgress('email');
	wipeConsole();
	var q = 'Cool.\n\nLet\'s save your progress now so you don\'t have to go through this again.\nWhat\'s your email address: ';
	newQ(q);
	adjustHeight('email');
	//typeit();
	insertEmailButton();
}

function emailPrompt(emailEntered) {
	punter.email = emailEntered;
	saveProgress('registerUser');

	if(punter.gender === 'Female') {
		punter.goAfterSave = 'giftQ';
	}
	else {
		punter.goAfterSave = 'workQ';
	}
	registerUser();
}


function handleEmailSubmit() {

		var emailToSave;

		emailToSave = $j('#email-to-save').val();
	 	emailPrompt(emailToSave);
		$j('.mobile-buttons.saving').remove();
	
}
