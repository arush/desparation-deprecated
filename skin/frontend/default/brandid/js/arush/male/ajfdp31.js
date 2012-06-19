typingDelay = 30; // global variable  // match this to text-effects.js

var $j = jQuery.noConflict();

function createPunter() {
		//global punter object
		punter = new Object();
		if($j.cookie('punter') != null) {
			punter = JSON.parse($j.cookie("punter"));
		}
	}

function registerUser(emailAd, firstname) {
	
	jqconsole.Write('Saving your progress... ', 'jqconsole-output wordwrap');
	typeit();
	var s = getLatestSpan();
	var referer = getReferer();
	$j(s).addClassName('loading');

    $j.ajax({
	  type: "POST",
	  url: "/subscribe/newbie",
	  data: {
	  	email: emailAd,
	  	fname: firstname,
	  	source: referer
	  },
	  success: function(data) {
		alert('message: '+data);
		var retval = JSON.parse(data);

		if(retval.status == 1) {
			$j(s).removeClass('loading');
			$j(s).removeClass('red');

			$j(s).text('Almost there - we need you to confirm your email. Click on the link we just sent you. ');
			typeit();
        }
        else if(retval.status == 214) {
        	$j(s).removeClass('loading');
			$j(s).removeClass('red');
			$j(s).text('Wait a sec, we\'ve already got you saved. Are you not receiving our emails? To stop our emails going to spam, please add <strong>help@getbrandid.com</strong> to your address book.');
			typeit();
        }
        else {
			$j(s).removeClass('loading');
			$j(s).addClass('red');
			$j(s).text(retval.message+'\nTry again: ');
			typeit();
			emailPrompt();
        }
	  }
	});
}

function offsideAnswer() {
	jqconsole.Prompt(true, function (input) {
			var genderAnswer = $j.trim(input);
			genderAnswer = input.toLowerCase();
			switch(genderAnswer) {
				case 'a':
					punter.gender = 'Male';
					saveProgress();
					jqconsole.Write('That is correct. You are clearly a man. ', 'jqconsole-output wordwrap');
					typeit();
					setTimeout('startEmail();',1500+500);
					break;
				case 'b':
					punter.gender = 'Female';
					saveProgress();
					jqconsole.Write('Correct! Wow, that\'s hot. Just kidding. I\'m a machine. ', 'jqconsole-output wordwrap');
					typeit();
					setTimeout('startEmail();',1500+500);
					break;
				case 'c':
					punter.gender = 'Female';
					saveProgress();
					jqconsole.Write('IMAGE OF BECKHAM\n. ', 'jqconsole-output readable wordwrap');
					typeit();
					setTimeout('startEmail();',1500);
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
	alert("saving cookie: "+ JSON.stringify(punter));
	$j.cookie('punter', JSON.stringify(punter), { expires: 1, path: '/' });
}

function clearProgress() {
	$j.cookie('punter', null, { expires: 1, path: '/' });
	createPunter();
	punter.fname = undefined; //this is as good as deleting punter, but leaves the ability to check against punter.fname later
}

function dropBackIn() {
 /* TO DO: FIND OUT WHICH STEP USER IS AT AND CONTINUE THE PROCESS */

}

function returningVisitor() {
	jqconsole.Write('Just to confirm:\na. Yes, it\'s me, '+punter.fname+', lets continue where we left off.\nb. I was just fooling around, let\'s start again.', 'jqconsole-output wordwrap');
	typeit();
	jqconsole.Prompt(true, function (input) {
		switch(input) {
			case 'a':
				dropBackIn();
				break;
			case 'b':
				clearProgress();
				jqconsole.Reset();
				jQuery('#console').html('');
				jqconsole = null;
				startConsole();
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

function printInstructions() {
	jqconsole.Write('Type your FIRSTNAME and press ENTER, for example:\n\n >>> Steve ', 'jqconsole-output instruction wordwrap');
}

var startPrompt = function () {

	setTimeout("printInstructions()",2000);

  	jqconsole.Prompt(true, function (input) {

	  	var name = $j.trim(input);
	      	name = capitaliseFirstLetter(name);
	    var smallName = name.length <= 1;
	  	// <= 1 char?
	  	if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;
	      	punter.sexGuess = genderGuess(name);
	      	saveProgress();

	        // Output input with the class jqconsole-output.
	        if(punter.sexGuess == 'female') {
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
		&& str != 'mike' )

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
