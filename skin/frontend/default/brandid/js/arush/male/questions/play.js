function playQ(mobile) {
	wipeConsole();

	saveProgress('playQ');
	var q = 'What do you wear for play? ';
	newQ(q);

	var s = $j('#male-welcome-msg');
	playImages(s, mobile);

}

function playDone(mobile) {
	newQ('Got it. ');
	typeit();
	setTimeout(function(){playQ(mobile)}, 1500); 

}

function playAa(mobile) {
	punter.play = 'shirts';

	wipeConsole();
	playDone(mobile);
}

function playAb(mobile) {
	punter.play = 'polos';

	wipeConsole();
	playDone(mobile);
}

function playAc(mobile) {
	punter.play = 'tees';

	wipeConsole();
	playDone(mobile);
}
	
function playAd(mobile) {
	punter.play = 'elvis';

	wipeConsole();	
	playDone(mobile);
}

function playA() {
	window.scrollTo(0,0);
	jqconsole.Write('a. Shirts\nb. Polos\nc. Tees\nd. Elvis Outfit ', 'jqconsole-output question wordwrap');
	setTimeout('typeit();',3000);
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				playAa(false);
				break;
			case 'b':
				playAb(false);
				break;
			case 'c':
				playAc(false);
				break;
			case 'd':
				playAd(false);
				break;
			default:
				jqconsole.Write('Choose one of the letters above.\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('workA();',1500); 
				break;
		}

	});
}