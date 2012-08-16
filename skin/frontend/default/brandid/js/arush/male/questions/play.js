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
	_kmq.push(['record', 'MALE Play Outfit', {'playshirts': punter.playShirts}]);
	newQ('Got it. ');
	typeit();
	setTimeout('rollQ()',1500);
}

function playAa() {
	punter.play = 1;
	punter.playShirts = true;

	wipeConsole();
	playDone();
}

function playAb() {
	punter.play = 2;
	punter.playShirts = false;
	punter.playTees = "polos";

	wipeConsole();
	playDone();
}

function playAc() {
	punter.play = 3;
	punter.playShirts = false;
	punter.playTees = "tees";

	wipeConsole();
	playDone();
}
	
function playAd() {
	punter.play = 4;
	punter.playShirts = false;
	punter.playTees = "elvis";

	wipeConsole();	
	playDone();
}