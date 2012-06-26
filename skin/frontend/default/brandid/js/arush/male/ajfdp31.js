typingDelay = 30; // global variable  // match this to text-effects.js

var $j = jQuery.noConflict();

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
				window.open("https://www.dropbox.com/s/ymle0o62nw5cje3/angel%20deck.pdf","_blank");
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

function createPunter() {
	//global punter object
	punter = new Object();
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

function insertButtons() {

}

function workQ(mobile) {
	saveProgress('workQ');
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();

	jqconsole.Write('What do you wear for work? ', 'jqconsole-output wordwrap');
	typeit();
	var s = getLatestSpan();
	//s = $j(s).parent();
	workImages(s);

	
	if(mobile) {
		var buttons = new Array();
		buttons[0] = new Array("convert","Smart", "workAa(true)");
		buttons[1] = new Array("convert","Casual", "workAb(true)");
		buttons[2] = new Array("convert","Hacker", "workAc(true)");
		buttons[3] = new Array("convert","Gorilla Suit", "workAd(true)");
		insertImageButtons(buttons,"work-image");
	}
	else {
		workA();
	}
}

function workAa(mobile) {

}

function workA() {
	jqconsole.Write('a. Smart (shirt, suit, trousers...)\nb. Casual (shirt, jeans, shoes)\nc. Hacker (tee, jeans, trainers)\nd. Gorilla Suit ', 'jqconsole-output question wordwrap');
	typeit();
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
				workQ();
				break;
			default:
				jqconsole.Write('Are you having trouble with your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
				typeit();
				setTimeout('confirmationA();',1500); 
				break;
		}

	});
}

function offsideQ() {
	jqconsole.Write('a. I\'m a man. Player A is offside.\nb. I\'m a woman who knows her football. Player A is offside.\nc. I\'m a woman. Just show me a picture of Beckham.\n\nType [a], [b] or [c] and press [ENTER] ','jqconsole-output question wordwrap');
	scrollPre();
	var s = getLatestSpan();
	$j(s).css('color','#444');
	var buttons = new Array();
	buttons[0] = new Array("smalltext convert","I'm a Man<br/><span class=\"button-caption\">Player A is offside</span>", "offsideAa(true)");
	buttons[1] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">I know my football, its Player A</span>", "offsideAb(true)");
	buttons[2] = new Array("smalltext convert","I'm a woman<br/><span class=\"button-caption\">just show me a picture of Beckham</span>", "offsideAc(true)");
	insertButtons(buttons);
	offsideA();
}

function offsideAa(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Male';
	saveProgress('startEmail');
	jqconsole.Write('That is correct. You are clearly a man. ', 'jqconsole-output green wordwrap');
	typeit();
	setTimeout('startEmail();',1500+500);
}
function offsideAb(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Female';
	saveProgress('startEmail');
	jqconsole.Write('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ', 'jqconsole-output wordwrap');
	typeit();
	setTimeout('startEmail();',1500+500);
}
function offsideAc(mobile) {
	if(mobile) {jqconsole.AbortPrompt();}
	clearMobileButtons();
	punter.gender = 'Female';
	saveProgress('startEmail');
	jqconsole.Write('IMAGE OF BECKHAM\n. ', 'jqconsole-output readable wordwrap');
	typeit();
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

function saveProgress(progress) {
	//progress parameter is name of the function of the next step
	punter.progress = progress;
	alert("saving cookie: "+ JSON.stringify(punter));
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
 window[punter.progress]();

}

function startAgain(mobile) {
	if(mobile) {
	 	jqconsole.AbortPrompt();
	 }
	clearProgress();
	jqconsole.Reset();
	jQuery('#console').html('');
	jqconsole = null;
	startConsole();
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

function startEmail() {

	jqconsole.Write('Cool.\n\nNow, I\'m going to ask you some quickfire questions because...\n\nLet\'s save your progress now so you don\'t have to go through this again.\nWhat\'s your email address: ', 'jqconsole-output wordwrap');
	typeit();
	emailPrompt();
}

function emailPrompt() {

	jqconsole.Prompt(true, function (input) {
		punter.email = input;
		saveProgress('registerUser');
		registerUser();
	});
}
function getDelayRequired() {
	var s = getLatestSpan();
	var delay = $j(s).text().length;
	delay = delay*typingDelay;
	return delay;
}

function performAppend(span, delay, string) {
	// get length of span, multiply by typeDelay to get delay required to display image
	var s = span;
	var delayRequired = delay;
	
	setTimeout(function(){
		$j(s).parent().append(string);
	}, delayRequired);
}

function getLatestSpan() {
	var e = $j('.jqconsole-output span');
	var count = e.length-1;
	var latest = $j(e)[count];
	return latest;
}
function clearMobileButtons() {
	$j('.mobile-buttons').remove();
}

function insertImageButtons(buttons, imageClass) {
	/* buttons[0][0] = class
		buttons[0][1] = text
		buttons[0][2] = onclick function
		*/
	var n = buttons.length;
	var i = 0;
	var s = $j('.'+imageClass);

	for (i=0; i<n; i++) {
		var className = buttons[i][0];
		var string = "<div class=\"mobile-buttons\"><a class=\""+className+"\" onclick=\""+buttons[i][2]+"\">"+buttons[i][1]+"</a></div>";
		var el = $j(s).eq(i).children('img');
		performAppend(el,0,string);
	}
}

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
	performAppend(s,0,string);
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
		string += "<div class=\"img-container "+columns+" "+images[i][1]+"\"><img class=\"scale-with-grid\" src=\""+images[i][0]+"\" alt=\"image option"+(i+1)+"\"/><span class=\"image-caption\">"+images[i][2]+"</span></div>";
	}

	string += "</div>";
	return string;
}

function stopScrolling() {
	clearInterval(scroller);
}
function scrollPre() {
	$j("#console pre").animate({ scrollTop: $j("#console pre").prop("scrollHeight") - $j('#console pre').height() }, 1000);
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

function printInstructions() {
	jqconsole.Write('Type your FIRSTNAME and press ENTER, for example:\n\n >>> Steve ', 'jqconsole-output instruction wordwrap');
}

var startPrompt = function () {

	setTimeout("printInstructions()",2000);

  	jqconsole.Prompt(true, function (input) {

	  	var name = $j.trim(input);
	  	name = name.toLowerCase();
      	name = capitaliseFirstLetter(name);

	    var smallName = name.length <= 1;
	  	// <= 1 char?
	  	if(input.toLowerCase() == 'investor') {
	    	investorAsk();
	    }
	    else if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;
	      	punter.sexGuess = genderGuess(name);
	      	saveProgress('offside');
	      	window.scrollTo(0,200);
	        if(punter.sexGuess == 'female') {
	        	jqconsole.Write('Hmm... '+ punter.fname + '. Forgive me if I\'m wrong, but that sounds like a girl\'s name.\n\nJust to be sure, I need you to answer this question: ', 'jqconsole-output wordwrap');
	        }
	        else {
	        	jqconsole.Write('Hmm... '+ punter.fname + '. That sounds like a good solid man\'s name.\n\nJust to be sure, I need you to answer this question: ', 'jqconsole-output wordwrap');
	        }
	        offside();
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


function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
