typingDelay = 20; // global variable  // match this to text-effects.js

var $j = jQuery.noConflict();

// @codekit-append "core/email.js"
// @codekit-append "core/helper.js"
// @codekit-append "core/images.js"
// @codekit-append "core/buttons.js"
// @codekit-append "core/punter.js"

// @codekit-append "questions/name.js"
// @codekit-append "questions/offside.js"
// @codekit-append "questions/investor.js"
// @codekit-append "questions/work.js"
// @codekit-append "questions/play.js"


/*********************************************** 
     Begin email.js 
***********************************************/ 

function resendConfirmation() {
	if(mobile) {jqconsole.AbortPrompt();}
		clearMobileButtons();
	jqconsole.Write('Resending confirmation email to '+punter.email+'.\nAdd help@getbrandid.com to your address book to make sure our emails don\'t go to spam.  ', 'jqconsole-output instruction wordwrap');
	registerUser();

}

function confirmationQ() {
	jqconsole.Write('a. I didn\'t get any email\nb. I clicked confirm, let\'s continue. ', 'jqconsole-output question wordwrap');
	typeit();

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","Resend confirmation", "resendConfirmation(true)");
	buttons[1] = new Array("convert","Continue", "workQ(true)");
	insertButtons(buttons);
	confirmationA();
	
}
function confirmationA() {
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				jqconsole.Write('', 'jqconsole-output green wordwrap');
				typeit();
				setTimeout('resendConfirmation(false);',1500+500);
				break;
			case 'b':
				workQ(false);
				break;
			default:
				jqconsole.Write('Are you having trouble with your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('confirmationA();',1500); 
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
	jqconsole.Focus;
	jqconsole.Prompt(true, function (input) {
		punter.email = input;
		saveProgress('registerUser');
		registerUser();
	});
}

/*********************************************** 
     Begin helper.js 
***********************************************/ 

function initiate() {
		//give the header an id, this saves complications down the line
        $j('.jqconsole-header span').attr('id','male-welcome-msg');
        $j('#male-welcome-msg').typewriter();
        $j('#male-welcome-msg').css('color', '#444');
    	window.scrollTo(0,0);
    	jqconsole.Focus;
}

function correctResponse(responseString) {
		jqconsole.Write(responseString, 'jqconsole-output green wordwrap');
		typeit();
}

function wipeConsole(mobile) {
	if(mobile) {
	 	jqconsole.AbortPrompt();
	 }
	clearProgress();
	jqconsole.Reset();
	jQuery('#console').html('');
	jqconsole = null;
}

function newQ(q) {
	jqconsole = $j('#console').jqconsole(q, ' >>> ');
	initiate();

	$j('#male-welcome-msg').typewriter();
    $j('#male-welcome-msg').css('color', '#444');
}

function performAppend(span, string) {
	// get length of span, multiply by typeDelay to get delay required to display image
	var s = span;

	$j(s).parent().append(string);
}

function getLatestSpan() {
	var e = $j('.jqconsole-output span');
	var count = e.length-1;
	var latest = $j(e)[count];
	return latest;
}

function getDelayRequired() {
	var s = getLatestSpan();
	var delay = $j(s).text().length;
	delay = delay*typingDelay;
	return delay;
}

function typeit() {
		/* types the latest element of the matched object passed */
		var s = getLatestSpan();
		var randomId = 'male' + (Math.floor(Math.random()*10000000)+1);
		$j(s).attr('id',randomId);
		/* scroll while typing */
		
	    $j('#'+randomId).typewriter();
		$j('#'+randomId).css('color', '#444');

}
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearMobileButtons() {
	$j('.mobile-buttons').remove();
}


/*********************************************** 
     Begin images.js 
***********************************************/ 

function insertImageButtons(buttons, imageClass) {
	/* buttons[0][0] = class
		buttons[0][1] = text
		buttons[0][2] = onclick function
		*/
	var n = buttons.length;
	var i = 0;

	for (i=0; i<n; i++) {
		var className = buttons[i][0];
		var string = "<div class=\"mobile-buttons\"><a class=\""+className+"\" onclick=\""+buttons[i][2]+"\">"+buttons[i][1]+"</a></div>";
		
		//find the image for this button and print it
		var s = $j('#'+imageClass+'-option'+(i+1));
		alert('#'+imageClass+'-option'+(i+1));
		performAppend(s,string);
	}
}

function printImage(images) {
	//url is an array with n number of urls

	var string = "<div class=\"image-question clearfix\">";
	var columns = "";
	var n = images.length;
	var i;

	switch(n) {
		case 1:
			columns = "one";
			break;
		case 2:
			columns = "two";
			break;
		case 3:
			columns = "three";
			break;
		case 4:
			columns = "four";
			break;
	}

	for (i=0; i<n; i++) {
		string += "<div class=\"img-container "+columns+" "+images[i][1]+"\"><img class=\"scale-with-grid\" src=\""+images[i][0]+"\" id=\""+images[i][1]+"-option"+(i+1)+"\" alt=\"image option"+(i+1)+"\"/><span class=\"image-caption\">"+images[i][2]+"</span></div>";
	}

	string += "</div>";
	return string;
}

/*********************************************** 
     Begin buttons.js 
***********************************************/ 

function insertButtons(buttons) {
	/* buttons[0][0] = class
		buttons[0][1] = text
		buttons[0][2] = onclick function
		*/

	var n = buttons.length;
	var i;
	var s = getLatestSpan();
	s = $j(s).parent();

	var string = "<div class=\"mobile-buttons\">";

	for (i=0; i<n; i++) {
		var className = buttons[i][0];
		if(i == 0) {
			//add 'first' for first button
			className += " first";
		}
		string += "<a class=\""+className+"\" onclick=\""+buttons[i][2]+"\">"+buttons[i][1]+"</a>";
	}
	string += "</div>";
	performAppend(s,string);
}

/*********************************************** 
     Begin punter.js 
***********************************************/ 

function createPunter() {
	
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
	}
}

function registerUser() {
	
	jqconsole.Write('Saving...  ', 'jqconsole-output loading-flash wordwrap');
	var s = getLatestSpan();
	$j(s).parent().removeClass('red');

	typeit();
	
	var loading = setInterval('typeit();', 2000);
	
	var referer = getReferer();

    $j.ajax({
	  type: "POST",
	  url: "/get/party/subscribe",
	  data: {
	  	email: punter.email,
	  	fname: punter.fname,
	  	gender: punter.gender,
	  	source: referer
	  },
	  success: function(data) {

		var retval = JSON.parse(data);

		$j(s).parent().removeClass('loading-flash');
		$j(s).parent().removeClass('red');
		
		if(retval.status == 1) {
			// save new requires email confirmation
			$j(s).parent().addClass('instruction');
			$j(s).text(retval.message);
			setTimeout('confirmationQ();',3500);
        }
        else if(retval.status == 2) {
        	// save existing
        	$j(s).parent().addClass('green');
			$j(s).text(retval.message);
			setTimeout('workQ();',1000);
        }
        else {
			$j(s).parent().addClass('red');
			$j(s).text(retval.message+'\nTry another email address: ');
			emailPrompt();
        }
		clearInterval(loading);
        typeit();
	  }
	});
}

function saveProgress(progress) {
	//progress parameter is name of the function of the next step
	punter.progress = progress;
	$j.cookie('punter', JSON.stringify(punter), { expires: 1, path: '/' });
}

function clearProgress() {
	$j.cookie('punter', null, { expires: 1, path: '/' });
	createPunter();
	punter.fname = undefined; //this is as good as deleting punter, but leaves the ability to check against punter.fname later
}

function dropBackIn(mobile) {
if(mobile) {
	jqconsole.AbortPrompt();
 }
 var go = String(punter.progress);
 window[punter.progress](mobile);

}

function startAgain(mobile) {
	wipeConsole(mobile);
	startMale();
}

function returningVisitor() {
	jqconsole.Write('Just to confirm: ', 'jqconsole-output wordwrap');
	typeit();
	jqconsole.Write('a. Yes, it\'s me, '+punter.fname+', lets continue where we left off.\nb. I was just fooling around, let\'s start again.', 'jqconsole-output question wordwrap');
	setTimeout('typeit();',800);

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","I'm not "+punter.fname, "startAgain(true)");
	buttons[1] = new Array("convert","Continue", "dropBackIn(true)");
	insertButtons(buttons);

	jqconsole.Prompt(true, function (input) {
		switch(input) {
			case 'a':
				dropBackIn(false);
				break;
			case 'b':
				startAgain(false);
				break;
			default:
				jqconsole.Write('What, no [a] and [b] on your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('returningVisitor();',1500);
				break;
		}
	});
}

/*********************************************** 
     Begin name.js 
***********************************************/ 

var nameA = function () {

	setTimeout("printInstructions()",2000);
  	jqconsole.Prompt(true, function (input) {

	  	var name = $j.trim(input);
	  	name = name.toLowerCase();
      	name = capitaliseFirstLetter(name);

	    var smallName = name.length <= 1;

	  	if(input.toLowerCase() === 'investor') {
	    	investorAsk();
	    }
	    else if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;

	      	punter.sexGuess = genderGuess(name);
	      	saveProgress('offside');

	        offside(punter.fname);
	    }
	    else {
	    	jqconsole.Write(name + '? Really? That\'s what mamma named you, huh?\n\nTry again smarty pants: ', 'jqconsole-output red wordwrap');
	            typeit();
	            startPrompt();
	    }
	  });
};

function genderGuess(str) {

	//check last letter
	str = str.toLowerCase();
	var last = str.charAt(str.length-1);
	if(
		(last == 'a'
		|| last == 'e'
		|| last == 'y'
		|| str == 'helen'
		|| str == 'sarah'
		|| str == 'hannah'
		|| str == 'megan'
		|| str == 'alison')
		&&
		(str != 'steve'
		&& str != 'bryce' 
		&& str != 'mike'
		&& str != 'harry' )

	) {
		return 'female';
	}
	else {
		return 'male';
	}
}

function printInstructions() {
	// enable the input prompt for mobile devices
	$j('.jqconsole-prompt').css('display','block');
	jqconsole.Write('Type your FIRSTNAME and press ENTER, for example:\n\n >>> Steve ', 'jqconsole-output instruction wordwrap');
}

/*********************************************** 
     Begin offside.js 
***********************************************/ 

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

/*********************************************** 
     Begin investor.js 
***********************************************/ 

function teamMenu() {
	jqconsole.Write('a. Open the team page in a new window\nb. Who is MALE™?\nc. Return to the Secret Menu ', 'jqconsole-output wordwrap');
	var s = getLatestSpan();
	$j(s).css('color', '#444');
	teamAnswer();
}

function teamAnswer() {
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				window.open("/keep/calm/wearepros","_blank");
				setTimeout('teamMenu();',1000);
				break;
			case 'b':
				jqconsole.Write('My true identity can never be revealed. However I can tell you this:\n\nMALE™ is the Masculine Algorithmic Learning Engine. MALE™ is learning all the time. When you signup, when you feedback on your deliveries, when you upgrade/downgrade or need new stuff, MALE™ learns exactly what you need, exactly when you need it. ', 'jqconsole-output wordwrap');
				typeit();
				setTimeout('teamMenu();',10000);
				break;
			case 'c':
				investorMenu();
				break;
			default:
				jqconsole.Write('No comprendes, partner. Gotta choose one of the options.\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('teamAnswer();',1500);
				break;
		}
	});
}

function investorMenuAnswer() {
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				jqconsole.Write('Our team is the perfect mix of tech startup, retail, fashion, branding and comms entrepreneurs.\nAnd we are deadly serious about solving clothing shopping for men. Forever. ', 'jqconsole-output wordwrap');
				typeit();
				setTimeout('teamMenu();',6000);
				break;
			case 'b':
				jqconsole.Write('Men don’t like shopping. And while men want to look good, most wouldn’t claim to be interested in fashion. Ecommerce for men is too often just ecommerce for women with the pinks turned blue.\n\nWant to know more? Download our deck (option d). ', 'jqconsole-output wordwrap');
				typeit();
				investorMenu();
				break;
			case 'c':
				jqconsole.Write('BRANDiD is an online subscription service for all the things men need, starting with designer basics such as underwear, socks, tees and shirts from the likes of Dior, Calvin Klein and Ralph Lauren.\n\nBRANDiD is specifically designed for the way men want to shop – no hassle, no fuss, no fluff. Your average man only shops to solve a problem, and once dealt with, never wants to deal with it again. Select, subscribe, sorted.\n\nWant to know more? Download our deck (option d). ', 'jqconsole-output readable wordwrap');
				typeit();
				investorMenu();
				break;
			case 'd':
				window.open("http://f.cl.ly/items/0C0F3k0e2F3E2A150B2u/angel%20deck.pdf","_blank");
				setTimeout('investorMenu();',1000);
				break;
			default:
				jqconsole.Write('Sorry buddy, gotta choose one of the options.\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('investorMenu();',4000);
				break;
		}

	});
}

function investorMenu() {
	jqconsole.Write('Secret Menu:\na. Team\nb. What problem are you solving?\nc. What\'s the answer?\nd. View the investor deck ', 'jqconsole-output wordwrap');
	var s = getLatestSpan();
	$j(s).css('color', '#444');
	investorMenuAnswer();
}

function investorPass() {
	jqconsole.Prompt(true, function (input) {
		var password = $j.trim(input);
		password = password.toLowerCase();
		
		jqconsole.Write('Gimme a sec... ', 'jqconsole-output wordwrap');
		typeit();

		var s = getLatestSpan();

		$j.ajax({
		  type: "POST",
		  url: "/get/party/password",
		  data: {
		  	pword: password
		  },
		  success: function(data) {
			var retval = JSON.parse(data);

			switch(retval.status) {
				case true:
					jqconsole.Write('That is correct.\nYou know, all this intelligence of mine requires a lot of power. I always need more.\nBut my bosses keep saying \"in this country, first you gotta get the money, then you get the power...\"\n\nThey always do it in a funny accent. Anyways... I hope you can help us get the money so I can get some power. ', 'jqconsole-output green wordwrap');
					typeit();
					setTimeout('investorMenu();',9500);
					break;
				default:
					jqconsole.Write('Computer says \"no\". Try another password: ', 'jqconsole-output red wordwrap');
					typeit();
					setTimeout('investorPass();',1000); 
					break;
			}
		  }
		});

	});
}

function investorAsk() {
	jqconsole.Write('So, you\'re an investor? What\'s the password: ', 'jqconsole-output wordwrap');
	typeit();
	investorPass();
}

/*********************************************** 
     Begin work.js 
***********************************************/ 

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

/*********************************************** 
     Begin play.js 
***********************************************/ 

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