function playQ() {
	wipeConsole();

	saveProgress('playQ');
	var q = 'What do you wear for play? ';
	newQ(q);
	typeit();

	var s = $j('#male-welcome-msg');
	playImages(s);

}

function playDone() {
	newQ('Got it. ');
	typeit();
	insertContinue('rollQ()');
}

function playAa() {
	punter.play = 'shirts';
	punter.playShirts = true;

	wipeConsole();
	playDone();
}

function playAb() {
	punter.play = 'polos';
	punter.playShirts = false;
	punter.playTees = "polos";

	wipeConsole();
	playDone();
}

function playAc() {
	punter.play = 'tees';
	punter.playShirts = false;
	punter.playTees = "tees";

	wipeConsole();
	playDone();
}
	
function playAd() {
	punter.play = 'elvis';
	punter.playShirts = false;
	punter.playTees = "elvis";

	wipeConsole();	
	playDone();
}