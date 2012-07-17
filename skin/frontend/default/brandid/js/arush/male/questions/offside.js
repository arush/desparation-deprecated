

function offsideQ() {
	jqconsole.Write('a. I\'m a man. Player A is offside.\nb. I\'m a woman who knows her football. Player A is offside.\nc. I\'m a woman. Just show me a picture of Beckham.\n\nType [a], [b] or [c] and press [ENTER] ','jqconsole-output question wordwrap');
	scrollPre();
	var s = getLatestSpan();
	$j(s).css('color','#444');
	var buttons = new Array();
	buttons[0] = new Array("smalltext convert","I'm a Man<br/><span class=\"button-caption\">Player A is offside</span>", "offsideAa(true)");
	buttons[1] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">I know my football, its Player A</span>", "offsideAb(true)");
	buttons[2] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">just show me a picture of Beckham</span>", "offsideAc(true)");
	insertButtons(buttons);
	offsideA();
}

function offsideAa(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Male';
	saveProgress('startEmail');
	jqconsole.Write('That is correct. You are clearly a man. ', 'jqconsole-output green wordwrap');
	typeit();
	setTimeout('startEmail();',1500+500);
}
function offsideAb(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Female';
	saveProgress('startEmail');
	jqconsole.Write('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ', 'jqconsole-output wordwrap');
	typeit();
	setTimeout('startEmail();',1500+500);
}
function offsideAc(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Female';
	saveProgress('startEmail');
	jqconsole.Write('IMAGE OF BECKHAM\n. ', 'jqconsole-output readable wordwrap');
	typeit();
	setTimeout('startEmail();',1500);
}

function offsideA() {
	jqconsole.Prompt(true, function (input) {
		var genderAnswer = $j.trim(input);
		genderAnswer = genderAnswer.toLowerCase();
		switch(genderAnswer) {
			case 'a':
				offsideAa(false);
				break;
			case 'b':
				offsideAb(false);
				break;
			case 'c':
				offsideAc(false);
				break;
			default:
				jqconsole.Write('Choose an option [a], [b] or [c] and press [ENTER]?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('offsideA();',1500); 
				break;
		}

	});
}


function startEmail() {

	jqconsole.Write('Cool.\n\nLet\'s save your progress now so you don\'t have to go through this again.\nWhat\'s your email address: ', 'jqconsole-output wordwrap');
	typeit();
	emailPrompt();
}

function emailPrompt() {

	jqconsole.Prompt(true, function (input) {
		punter.email = input;
		saveProgress('registerUser');
		registerUser();
	});
}