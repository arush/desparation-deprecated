typingDelay = 15; // global variable  // match this to text-effects.js

var $j = jQuery.noConflict();

// @codekit-append "core/punter.js"
// @codekit-append "core/email.js"
// @codekit-append "core/helper.js"
// @codekit-append "core/images.js"
// @codekit-append "core/buttons.js"


// @codekit-append "questions/name.js"
// @codekit-append "questions/offside.js"
// @codekit-append "questions/investor.js"
// @codekit-append "questions/work.js"
// @codekit-append "questions/play.js"
// @codekit-append "questions/roll.js"
// @codekit-append "questions/gift.js"

/*********************************************** 
     Begin punter.js 
***********************************************/ 

function createPunter() {
	
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
	}
}

function registerUser() {
	wipeConsole();
	newQ(punter.email+' ');
	$j('#male-welcome-msg').css('color','#444444');

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
			setTimeout('confirmationQ();',2500);
        }
        else if(retval.status == 2) {
        	// save existing
        	$j(s).parent().addClass('green');
			$j(s).text(retval.message);
			
			window[punter.goAfterSave]();
			
        }
        else {
			$j(s).parent().addClass('red');
			$j(s).text(retval.message+'\nTry another email address: ');
			insertEmailButton();
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
if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
 window[punter.progress]();

}

function startAgain(mobile) {
	wipeConsole();
	clearProgress();
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

	// jqconsole.Prompt(true, function (input) {
	// 	switch(input) {
	// 		case 'a':
	// 			dropBackIn(false);
	// 			break;
	// 		case 'b':
	// 			startAgain(false);
	// 			break;
	// 		default:
	// 			jqconsole.Write('What, no [a] and [b] on your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
	// 			typeit();
	// 			setTimeout('returningVisitor();',1500);
	// 			break;
	// 	}
	// });
}

/*********************************************** 
     Begin email.js 
***********************************************/ 

function resendConfirmation() {
	if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
		clearMobileButtons();
	jqconsole.Write('Resending confirmation email to '+punter.email+'.\nAdd help@getbrandid.com to your address book to make sure our emails don\'t go to spam.  ', 'jqconsole-output instruction wordwrap');
	registerUser();

}

function confirmationQ() {
	jqconsole.Write('a. I didn\'t get any email\nb. I clicked confirm, let\'s continue. ', 'jqconsole-output question wordwrap');
	typeit();

	var buttons = new Array();
	buttons[0] = new Array("convert secondary","Resend confirmation", "resendConfirmation()");
	
	if(punter.gender === 'Female') {
		buttons[1] = new Array("convert","Continue", "giftQ()");	
	}
	else {
		buttons[1] = new Array("convert","Continue", "workQ()");	
	}
	
	insertButtons(buttons);
	// confirmationA();
	
}

function insertEmailButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="email-to-save" type="email" name="email" value="Enter your email address…" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleEmailSubmit(); return false;">Save Progress</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
}


function startEmail() {
	saveProgress('email');
	wipeConsole();
	var q = 'Cool.\n\nLet\'s save your progress now so you don\'t have to go through this again.\nWhat\'s your email address: ';
	newQ(q);
	adjustHeight('email');
	//typeit();
	insertEmailButton();
}

function emailPrompt(emailEntered) {
	punter.email = emailEntered;
	saveProgress('registerUser');

	if(punter.gender === 'Female') {
		punter.goAfterSave = 'giftQ';
	}
	else {
		punter.goAfterSave = 'workQ';
	}
	registerUser();
}


function handleEmailSubmit() {

		var emailToSave;

		emailToSave = $j('#email-to-save').val();
	 	emailPrompt(emailToSave);
		$j('.mobile-buttons.saving').remove();
	
}


/*********************************************** 
     Begin helper.js 
***********************************************/ 

function initiate() {
		//give the header an id, this saves complications down the line
        $j('.jqconsole-header span').attr('id','male-welcome-msg');
        $j('pre.jqconsole').css('position','relative');
        $j('#male-welcome-msg').typewriter();
        $j('#male-welcome-msg').css('color', '#444');
    	window.scrollTo(0,0);
    	// jqconsole.Focus;
    	$j('pre').attr('disabled','true');
    	$j('pre').attr('readonly','readonly');
    	/mobile/i.test(navigator.userAgent) && setTimeout(function () {
		  window.scrollTo(0, 1);
		}, 1000);
}

function stopKeyboard(e){
	e.stopPropagation();
}

function correctResponse(responseString) {
		jqconsole.Write(responseString, 'jqconsole-output green wordwrap');
		typeit();
}

function wipeConsole() {
	if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
	jqconsole.Reset();
	jQuery('#console').html('');
	jqconsole = null;
	window.scrollTo(0,0);
}

function clearDefaultJ(el) {
	/* jquery version of clearDefault defined elsewhere */
  		if (el.defaultValue===el.value) {
  			el.value = "";
		    $j('#subscribe_btn').removeClass('disabled');
		}
	}
function restoreTextJ(el) {
	/* jquery version of restoreText defined elsewhere */
	if (el.value === "") {
		el.value = el.defaultValue;
	}
}



function adjustHeight(step) {
	return false;
	switch(step) {
		case 'work':
			$j('.male-console').css('height','640px');
			break;
		case 'beckham':
			var newHeight = parseInt($j('.img-container.one.offside.beckham').css('height')) + 120;
			newHeight += 'px';
			$j('.male-console').css('height',newHeight);
			break;
		case 'email':
			var newHeight = parseInt($j('#male-welcome-msg').css('height')) + 20;
			newHeight += 'px';
			alert(newHeight);
			$j('.male-console').css('height',newHeight);
		default:
			var newHeight;
			newHeight = parseInt($j('.mobile-buttons').css('height')) + parseInt($j('.jqconsole-header').css('height')) + 100;
			newHeight += 'px';
			$j('.male-console').css('height',newHeight);
			break;
	}
	
}

function newQ(q) {
	jqconsole = $j('#console').jqconsole(q, ' >>> ');
	initiate();
	adjustHeight('new');
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

		performAppend(s,string);
	}
}

function printImage(images, link) {
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
		string += "<a href=\"#\" onclick=\""+images[i][3]+"\"><div class=\"img-container "+columns+" "+images[i][1]+"\"><img class=\"scale-with-grid\" src=\""+images[i][0]+"\" id=\""+images[i][1]+"-option"+(i+1)+"\" alt=\"image option"+(i+1)+"\"/><span class=\"image-caption\">"+images[i][2]+"</span></div></a>";
	}

	string += "</div>";
	return string;
}

/*********************************************** 
     Begin buttons.js 
***********************************************/ 

function insertButtons(buttons, target) {
	// set default value incase target is not passed
	target = typeof target !== 'undefined' ? target : 'default_target';

	var n = buttons.length;
	var i;
	
	if(target === 'default_target') {
		var s = getLatestSpan();
	}
	else {
		var s = $j(target);
	}
	s = $j(s).parent();

	var string = "<div class=\"mobile-buttons clearfix\">";

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
	adjustHeight();
}

function insertContinue(nextStep, buttonText) {
	// default button text is 'continue'
	buttonText = typeof buttonText !== 'undefined' ? buttonText : 'continue';

	var string = "<div class=\"mobile-buttons clearfix\"><a class=\"continue convert\" onclick=\""+nextStep+"\">"+buttonText+"</a></div>";

	var s = $j('#male-welcome-msg').parent();
	performAppend(s,string);
	adjustHeight();
}

/*********************************************** 
     Begin name.js 
***********************************************/ 

var nameA = function (input) {

	  	var name = $j.trim(input);
	  	name = name.toLowerCase();
      	name = capitaliseFirstLetter(name);

	    var smallName = name.length <= 1;

	  	if(input.toLowerCase() === 'investor') {
	    	investorAsk();
	    }
	    else if(input.toLowerCase() === 'male') {
	    	jqconsole.Write(name + '? Really? Somehow I doubt that. Try again: ', 'jqconsole-output red wordwrap');
            typeit();
            insertNameButton();
	    }
	    else if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;

	      	punter.sexGuess = genderGuess(name);
	      	

	        offside(punter.fname);
	    }
	    else {
	    	jqconsole.Write(name + '? Really? That\'s what mamma named you, huh?\n\nTry again smarty pants: ', 'jqconsole-output red wordwrap');
	            typeit();
	            insertNameButton();
	    }
};

function insertNameButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="name-to-save" type="text" name="firstname" value="e.g. Steve" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleNameSubmit(); return false;">Feed the M.A.L.E™</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
}

function handleNameSubmit() {

		var nameToSave;

		nameToSave = $j('#name-to-save').val();
	 	
		// in case they entered 2 names, just take the first name before the space
	 	nameToSave = nameToSave.split(" ");
	 	nameA(nameToSave[0]);
		$j('.mobile-buttons.saving').remove();
	
}

function genderGuess(str) {

	//check last letter
	str = str.toLowerCase();
	var last = str.charAt(str.length-1);
	// check last 2 letters
	var last2 = str.charAt(str.length-2)+last;

	if(
		/* rules */
		(last == 'a'
		|| last == 'e'
		|| last == 'y'
		|| last == 'i'
		|| last2 == 'in'
		|| last2 == 'ah'
		|| last2 == 'en'
		|| last2 == 'an'
		|| last2 == 'yn'
		|| last2 == 'er')
		&&
		/* exceptions */
		(str != 'steve'
		/* 3 letter names usually mens */
		&& str.length != 3
		&& str != 'sean'
		&& str != 'steven'
		&& str != 'dimitri'
		&& str != 'ravi'
		&& str != 'kenny'
		&& str != 'naoki'
		&& str != 'ayman'
		&& str != 'sachin'
		&& str != 'edwin'
		&& str != 'justin'
		&& str != 'nitin'
		&& str != 'bryce' 
		&& str != 'mike'
		&& str != 'gary'
		&& str != 'jonathan'
		&& str != 'harry'
		&& str != 'male' )

	) {
		return 'female';
	}
	else {
		return 'male';
	}
}


/*********************************************** 
     Begin offside.js 
***********************************************/ 

function offside(fname) {
		saveProgress('offside');

		wipeConsole();
		
		var q;
		if(punter.sexGuess === 'female') {
        	q = 'Hmm... '+ punter.fname + '. Now remember, I\'m AAI (Artificial Artificial Intelligence), so I may be wrong, but that sounds like a woman\'s name.\n\nJust to be sure, can you tell me which player is offside: ';
        }
        else {
        	q = 'Hmm... '+ punter.fname + '. Now remember, I\'m AAI (Artificial Artificial Intelligence), so I may be wrong, but that sounds like a good solid man\'s name.\n\nJust to be sure, can you tell me which player is offside: ';
        }
    	newQ(q);

		typeit();

		setTimeout('offsideQ()',5000);
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
	
	var q = 'You said: You are a man, Player A is offside ';

	newQ(q);

	setTimeout(function(){correctResponse('That is correct. You are clearly a man. ')}, 2000);
	setTimeout(function(){insertContinue('startEmail()')},2000);

}
function offsideAb() {
	wipeConsole();

	punter.gender = 'Female';
	
	var q = 'You said: You are a woman who knows her sport, Player A is offside ';

	newQ(q);
	setTimeout(function(){correctResponse('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ')}, 2000);
	setTimeout(function(){insertContinue('startEmail()')},2000);
}
function offsideAc() {
	wipeConsole();

	punter.gender = 'Female';
	
	var q = 'These guys should have gone to BRANDiD... ';

	newQ(q);
	
	setTimeout(function(){beckham()},1000);
	setTimeout(function(){insertContinue('startEmail()')},1000);
}

/*********************************************** 
     Begin investor.js 
***********************************************/ 

function teamMenu() {
	jqconsole.Write('a. Open the team page in a new window\nb. Who is M.A.L.E™?\nc. Return to the Secret Menu ', 'jqconsole-output wordwrap');
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
				jqconsole.Write('My true identity can never be revealed. However I can tell you this:\n\nM.A.L.E™ is the Masculine Algorithmic Learning Engine. M.A.L.E™ is learning all the time. When you signup, when you feedback on your deliveries, when you upgrade/downgrade or need new stuff, M.A.L.E™ learns exactly what you need, exactly when you need it. ', 'jqconsole-output wordwrap');
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
	insertPasswordButton();
}

function insertPasswordButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="password-to-save" type="password" name="password" value="" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handlePasswordSubmit(); return false;">Attempt Access</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
}


/*********************************************** 
     Begin work.js 
***********************************************/ 

function workQ() {
	wipeConsole();

	saveProgress('workQ');
	var q = 'I need to get to know you first before I can recommend a plan for you.\n\nWhat do you wear for work most of the time? '
	newQ(q);
	typeit();

	var s = $j('#male-welcome-msg');
	//s = $j(s).parent();
	workImages(s);
}

function workDone(q) {
	newQ(q);
	typeit();
	insertContinue('playQ()');

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

/*********************************************** 
     Begin play.js 
***********************************************/ 

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

	wipeConsole();
	playDone();
}

function playAb() {
	punter.play = 'polos';

	wipeConsole();
	playDone();
}

function playAc() {
	punter.play = 'tees';

	wipeConsole();
	playDone();
}
	
function playAd() {
	punter.play = 'elvis';

	wipeConsole();	
	playDone();
}

/*********************************************** 
     Begin roll.js 
***********************************************/ 

// Generated by CoffeeScript 1.3.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.rollQ = function() {
    var q, s;
    wipeConsole();
    saveProgress("rollQ");
    q = "How do you roll? ";
    newQ(q);
    typeit();
    s = $j("#male-welcome-msg");
    return rollImages(s);
  };

  root.rollDone = function() {
    newQ("Got it. ");
    typeit();
    return insertContinue("emailPrompt(punter.email)", "save progress");
  };

  root.rollAa = function() {
    punter.roll = "private jet";
    wipeConsole();
    return rollDone();
  };

  root.rollAb = function() {
    punter.roll = "business class";
    wipeConsole();
    return rollDone();
  };

  root.rollAc = function() {
    punter.roll = "economy";
    wipeConsole();
    return rollDone();
  };

  root.rollAd = function() {
    punter.roll = "bus";
    wipeConsole();
    return rollDone();
  };

}).call(this);


/*********************************************** 
     Begin gift.js 
***********************************************/ 

// Generated by CoffeeScript 1.3.3
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.giftQ = function() {
    var buttons, giftBut1, giftBut2, q;
    wipeConsole();
    saveProgress("giftQ");
    q = "You must be looking to buy a gift for a very lucky man. But do you just want to gift a one-off taster, or set him up with a full recurring plan? ";
    newQ(q);
    typeit();
    giftBut1 = ["smalltext convert", "Gift a taster<br/><span class=\"button-caption\">Buy him a 1, 3 or 12 month taster</span>", "giftAa()"];
    giftBut2 = ["smalltext convert", "Impersonate your man<br/><span class=\"button-caption\">Set up a recurring plan on his behalf</span>", "giftAb()"];
    buttons = [giftBut1, giftBut2];
    return setTimeout((function() {
      return insertButtons(buttons, "#male-welcome-msg");
    }), 3500);
  };

  root.giftAa = function() {
    punter.gift = "gifter";
    wipeConsole();
    newQ("I wish I had a fembot like you.\n\nThe link below will take you to the gift page. If you don't like what you see, just use your browser's back button to continue M.A.L.E.™ where you left off. ");
    typeit();
    return setTimeout((function() {
      return insertContinue("window.location.href='/keep/calm/getgifted'", "Go to Gifts Page");
    }), 3000);
  };

  root.giftAb = function() {
    punter.gift = "impersonator";
    wipeConsole();
    newQ("I know, I know, your man is too lazy to do this himself. What would he do without you.\n\nLet's continue the questions pretending you're him... ");
    typeit();
    return setTimeout((function() {
      return insertContinue("workQ()");
    }), 2000);
  };

}).call(this);
