function workQ(mobile) {
	saveProgress('workQ');
	if(mobile) {
		if(jqconsole.GetState() == "prompt") {
			jqconsole.AbortPrompt();
		}
	}
	clearMobileButtons();

	jqconsole.Write('Right, I\'m gonna ask you some quick questions so I can recommend a plan for you.\n\nFirstly, what do you wear for work? ', 'jqconsole-output wordwrap');
	typeit();
	var s = getLatestSpan();
	//s = $j(s).parent();
	workImages(s, mobile);
}



function workAa(mobile) {

}



function workAd(mobile) {
	
	jqconsole.Write('It is hard for the ape to believe he descended from man.\n- H. L. Mencken, American Author, Man Since 1880.\n\n','jqconsole-output wordwrap');
	typeit();
	setTimeout('playQ();',2500);
}

function workA() {
	jqconsole.Write('a. Smart (shirt, suit, trousers...)\nb. Casual (shirt, jeans, shoes)\nc. Laid Back (tee, jeans, trainers)\nd. Gorilla Suit ', 'jqconsole-output question wordwrap');
	setTimeout('typeit();',3000);
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				workAa(false);
				break;
			case 'b':
				workAb(false);
				break;
			case 'c':
				workAc(false);
				break;
			case 'd':
				workAd(false);
				break;
			default:
				jqconsole.Write('Cat got your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('workA();',1500); 
				break;
		}

	});
}