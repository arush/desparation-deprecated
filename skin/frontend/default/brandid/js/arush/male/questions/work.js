function workQ() {
	wipeConsole();

	saveProgress('workQ');
	var q = 'I need to get to know you first before I can recommend a plan for you.\n\nWhat do you wear for work? '
	newQ(q);
	typeit();

	var s = $j('#male-welcome-msg');
	//s = $j(s).parent();
	workImages(s);
}

function workDone(q) {
	newQ(q);
	typeit();
	setTimeout(function(){insertContinue('playQ()')},500);

}

function workAa() {
	punter.work = 'suit';

	wipeConsole();
	var q = 'Ladies love the suits.\n\n';
	workDone(q);
}

function workAb() {
	punter.work = 'casual';

	wipeConsole();
	var q = 'Nice. Suits are for losers anyway.\n\n';
	
	workDone(q);
}

function workAc() {
	punter.work = 'laid back';

	wipeConsole();
	var q = 'Nice. Real bosses wear jeans and tee to work.\n\n';
	
	workDone(q);
}


function workAd() {
	punter.work = 'gorilla suit';

	wipeConsole();
	var q = 'It is hard for the ape to believe he descended from man.\n- H. L. Mencken, American Author\nMan Since 1880.\n\n';
	
	workDone(q);
	
}