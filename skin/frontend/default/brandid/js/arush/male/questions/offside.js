function offside(fname) {
		saveProgress('offside');

		if(punter.justStarted === true) {

			punter.justStarted = false;
		}
		else {
			wipeConsole();
		}
		
		var q;
		if(punter.sexGuess === 'female') {
        	q = 'Hmm... '+ punter.fname + '. Now remember, I\'m AAI (Artificial Artificial Intelligence), so I may be wrong, but that sounds like a woman\'s name.\n\nJust to be sure, can you tell me which player is offside: ';
        }
        else {
        	q = 'Hmm... '+ punter.fname + '. Now remember, I\'m AAI (Artificial Artificial Intelligence), so I may be wrong, but that sounds like a good solid man\'s name.\n\nJust to be sure, can you tell me which player is offside: ';
        }
    	newQ(q);

		typeit();

		setTimeout('offsideQ()',4000);
		// offsideQ();
	}

function offsideQ() {
		

		attach();

		jqconsole.Write('a. I\'m a man. Player A is offside.\nb. I\'m a woman who knows her football. Player A is offside.\nc. I\'m a woman. Just show me a picture of Beckham.\n\nType [a], [b] or [c] and press [ENTER] ','jqconsole-output question wordwrap');
		
		typeit();
		
		var buttons = new Array();
		buttons[0] = new Array("smalltext convert","I'm a Man<br/><span class=\"button-caption\">Player A is offside</span>", "offsideAa()");
		buttons[1] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">I know my football, its Player A</span>", "offsideAb()");
		buttons[2] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">just show me a picture of Beckham</span>", "offsideAc()");

		insertButtons(buttons);
	}

function offsideAa() {
	wipeConsole();
	
	punter.gender = 'Male';
	
	/* KISSmetrics tracking */
    if(typeof(_kmq) !== "undefined") {
    	_kmq.push(['record', 'MALE Offside', {'gender': 'male'}]);
    }

    /* Mixpanel Tracking */
   	if(typeof(mixpanel) !== "undefined") {
   		mixpanel.track("MALE Offside", {"Offside Answer": "I'm a man, Player A is offside"});
   		mixpanel.register({ gender: "male" });
	}

	var q = 'You said: You are a man, Player A is offside ';

	newQ(q);

	setTimeout(function(){correctResponse('That is correct. You are clearly a man. ')}, 2000);
	setTimeout('maleJumpersHoodiesQ()',4000);

}
function offsideAb() {
	wipeConsole();

	punter.gender = 'Female';

	/* KISSmetrics tracking */
    if(typeof(_kmq) !== "undefined") {
		_kmq.push(['record', 'MALE Offside', {'gender': 'female'}]);
    }

    /* Mixpanel Tracking */
   	if(typeof(mixpanel) !== "undefined") {
   		mixpanel.track("MALE Offside", {"Offside Answer": "I'm a a woman who knows her sport, Player A is offside"});
   		mixpanel.register({ gender: "female" });
	}


	
	var q = 'You said: You are a woman who knows her sport, Player A is offside ';

	newQ(q);
	setTimeout(function(){correctResponse('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ')}, 2000);
	setTimeout(function(){insertContinue('giftQ()')},2000);
}
function offsideAc() {
	wipeConsole();

	punter.gender = 'Female';
	
	/* KISSmetrics tracking */
    if(typeof(_kmq) !== "undefined") {
		_kmq.push(['record', 'MALE Offside', {'gender': 'female'}]);
    }

    /* Mixpanel Tracking */
   	if(typeof(mixpanel) !== "undefined") {
   		mixpanel.track("MALE Offside", {"Offside Answer": "Just show me a picture of Beckham"});
   		mixpanel.register({ gender: "female" });
	}

	

	
	var q = 'These guys should have gone to BRANDiD... ';

	newQ(q);
	
	setTimeout(function(){beckham()},1000);
	setTimeout(function(){insertContinue('giftQ()')},1000);
}