function playQ(mobile) {
	saveProgress('playQ');
	if(mobile) {
		if(jqconsole.GetState() == "prompt") {
			jqconsole.AbortPrompt();
		}
	}
	clearMobileButtons();

	jqconsole.Write('So, what do you wear for play?','jqconsole-output wordwrap');
	typeit();

	var s = getLatestSpan();
	playImages(s, mobile);

}

function playA() {
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