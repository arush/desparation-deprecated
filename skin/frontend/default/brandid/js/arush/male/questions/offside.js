function offside(fname) {

		wipeConsole();
		
		var q;
		if(punter.sexGuess === 'female') {
        	q = 'Hmm... '+ fname + '. Forgive me if I\'m wrong, but that sounds like a girl\'s name.\n\nJust to be sure, I need you to answer this question: ';
        }
        else {
        	q = 'Hmm... '+ fname + '. That sounds like a good solid man\'s name.\n\nJust to be sure, I need you to answer this question: ';
        }
    	newQ(q);

		typeit();

		setTimeout('offsideQ()',2000);
	}

function offsideQ() {
		
		// this only works on a setTimeout
		setTimeout('attach()',1000);

		jqconsole.Write('a. I\'m a man. Player A is offside.\nb. I\'m a woman who knows her football. Player A is offside.\nc. I\'m a woman. Just show me a picture of Beckham.\n\nType [a], [b] or [c] and press [ENTER] ','jqconsole-output question wordwrap');
		
		
		var buttons = new Array();
		buttons[0] = new Array("smalltext convert","I'm a Man<br/><span class=\"button-caption\">Player A is offside</span>", "offsideAa(true)");
		buttons[1] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">I know my football, its Player A</span>", "offsideAb(true)");
		buttons[2] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">just show me a picture of Beckham</span>", "offsideAc(true)");
		
		setTimeout(function(){insertButtons(buttons)}, 1000);
		
		offsideA();
	}

function offsideAa(mobile) {
	wipeConsole();
	
	punter.gender = 'Male';
	saveProgress('startEmail');
	
	var q = 'You said: You are a man, Player A is offside ';

	newQ(q);

	setTimeout(function(){correctResponse('That is correct. You are clearly a man. ')}, 2000);

	setTimeout('startEmail();',3500);
}
function offsideAb(mobile) {
	wipeConsole();

	punter.gender = 'Female';
	saveProgress('startEmail');
	
	var q = 'You said: You are a woman, Player A is offside ';

	newQ(q);
	setTimeout(function(){correctResponse('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ')}, 2000);

	setTimeout('startEmail();',3500);
}
function offsideAc(mobile) {
	wipeConsole();

	punter.gender = 'Female';
	saveProgress('startEmail');
	
	var q = 'Romance is in the air... ';

	newQ(q);
	
	setTimeout(function(){beckham()},1500);

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