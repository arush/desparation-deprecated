function resendConfirmation() {
	if(mobile) {jqconsole.AbortPrompt();}
		clearMobileButtons();
	jqconsole.Write('Resending confirmation email to '+punter.email+'.\nAdd help@getbrandid.com to your address book to make sure our emails don\'t go to spam.  ', 'jqconsole-output instruction wordwrap');
	registerUser();

}

function confirmationQ() {
	jqconsole.Write('a. I didn\'t get any email\nb. I clicked confirm, let\'s continue. ', 'jqconsole-output question wordwrap');
	typeit();

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","Resend confirmation", "resendConfirmation(true)");
	buttons[1] = new Array("convert","Continue", "workQ(true)");
	insertButtons(buttons);
	confirmationA();
	
}
function confirmationA() {
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				jqconsole.Write('', 'jqconsole-output green wordwrap');
				typeit();
				setTimeout('resendConfirmation(false);',1500+500);
				break;
			case 'b':
				workQ(false);
				break;
			default:
				jqconsole.Write('Are you having trouble with your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('confirmationA();',1500); 
				break;
		}

	});
}