function workQ(mobile) {
	wipeConsole();

	var q = 'I need to get to know you first before I can recommend a plan for you.\n\nWhat do you wear for work? '
	newQ(q);
	typeit();

	var s = $j('#male-welcome-msg');
	//s = $j(s).parent();
	setTimeout(function(){workImages(s, mobile)}, 2000); 
}

function workDone(q, mobile) {
	newQ(q);
	typeit();
	setTimeout(function(){playQ(mobile)}, 1500); 

}

function workAa(mobile) {
	punter.work = 'suit';

	wipeConsole();
	var q = 'Ladies love the suits.\n\n';
	workDone(q, mobile);
}

function workAb(mobile) {
	punter.work = 'casual';

	wipeConsole();
	var q = 'Nice. Suits are for losers anyway.\n\n';
	
	workDone(q, mobile);
}

function workAc(mobile) {
	punter.work = 'laid back';

	wipeConsole();
	var q = 'Nice. Real bosses wear jeans and tee to work.\n\n';
	
	workDone(q, mobile);
}


function workAd(mobile) {
	punter.work = 'gorilla suit';

	wipeConsole();
	var q = 'It is hard for the ape to believe he descended from man.\n- H. L. Mencken, American Author, Man Since 1880.\n\n';
	
	workDone(q, mobile);
	
}

function workA() {

	//fix container height
	adjustHeight('work');

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