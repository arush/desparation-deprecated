typingDelay = 30; // global variable  // match this to text-effects.js

var $j = jQuery.noConflict();

function offsideAnswer() {
	jqconsole.Prompt(true, function (input) {
			var genderAnswer = $j.trim(input);
			genderAnswer = input.toLowerCase();
			switch(genderAnswer) {
				case 'a':
					punter.gender = 'Male';
					jqconsole.Write('That is correct. You are clearly a man. ', 'jqconsole-output wordwrap');
					typeit();
					setTimeout('saveProgress();',1500+500);
					break;
				case 'b':
					punter.gender = 'Female';
					jqconsole.Write('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ', 'jqconsole-output wordwrap');
					typeit();
					setTimeout('saveProgress();',1500+500);
					break;
				case 'c':
					punter.gender = 'Female';
					jqconsole.Write('IMAGE OF BECKHAM\n. ', 'jqconsole-output readable wordwrap');
					typeit();
					setTimeout('saveProgress();',1500);
					break;
				default:
					jqconsole.Write('Are you having trouble with your keyboard?\nTry again: ', 'jqconsole-output red wordwrap');
					typeit();
					setTimeout('offsideAnswer();',1500); 
					break;
			}

		});
}

function saveProgress() {
	jqconsole.Write('So, '+ punter.fname + ', let\'s save your progress so you don\'t have to go through this again.\nWhat\'s your email address: ', 'jqconsole-output wordwrap');
	typeit();
	emailPrompt();
}

function emailPrompt() {

	jqconsole.Prompt(true, function (input) {
		punter.email = input;
		registerUser(punter.email,punter.fname);

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
		
		// scroll the screen
	    window.scrollTo(0,$j('#male-header').height());

	}, delayRequired);
}

function getLatestSpan() {
	var e = $j('.jqconsole-output span');
	var count = e.length-1;
	var latest = $j(e)[count];
	return latest;
}

function printImage(url,className, caption) {
	//url is an array with n number of urls

	var string = "<div class=\"image-question\">";
	var columns = "";
	var n = url.length;
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
	}

	for (i=0; i<n; i++) {
		string += "<img class=\""+columns+" scale-with-grid "+className+"\" src=\""+url[i]+"\" alt=\"image option 1\"/><span class=\"image-caption\">"+caption+"</span>";
	}

	string += "</div>";
	return string;
}

function typeit() {
		/* types the latest element of the matched object passed */
		var s = getLatestSpan();
		var randomId = 'male' + (Math.floor(Math.random()*10000000)+1);
		
		$j(s).attr('id',randomId);
	    $j('#'+randomId).typewriter();
		$j('#'+randomId).css('color', '#444');
	}

var startPrompt = function () {

  	jqconsole.Prompt(true, function (input) {

	  	var name = $j.trim(input);
	      	name = capitaliseFirstLetter(name);
	    var smallName = name.length <= 1;
	  	// <= 1 char?
	  	if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;

	      	var sex = genderGuess(name);
	        // Output input with the class jqconsole-output.
	        if(sex == 'female') {
	        	jqconsole.Write('Hmm... '+ input + '. Forgive me if I\'m wrong, but that sounds like a girl\'s name.\n\nJust to be sure, I need you to answer this question: ', 'jqconsole-output wordwrap');
	        }
	        else {
	        	jqconsole.Write('Hmm... '+ input + '. That sounds like a good solid man\'s name.\n\nJust to be sure, I need you to answer this question: ', 'jqconsole-output wordwrap');
	        }
	        offside();
	    }
	    else {
	    	jqconsole.Write(name + '? Really? That\'s what mamma named you, huh?\n\nTry again smarty pants: ', 'jqconsole-output red wordwrap');
	            typeit();
	            startPrompt();
	    }

	    // debug
	    // startPrompt();
	  });
	};

function genderGuess(str) {

	//check last letter
	str = str.toLowerCase();
	var last = str.charAt(str.length-1);
	if(
		last == 'a'
		|| last == 'e'
		|| last == 'y'
		|| str == 'helen'
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
