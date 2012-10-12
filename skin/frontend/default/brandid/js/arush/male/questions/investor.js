function investorMenuAnswer() {
	$j('.jqconsole-prompt').css('display','block');
	$j('.jqconsole-input').css('display','block');
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				wipeConsole();
				var q = 'Follow us to get involved with fundraising ';
				newQ(q);
				typeit();
				var thing = '<div class=\'angellist_embed\' data-startup_id=\'110936\'></div><script type=\'text/javascript\' src=\'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js\'></script><script type=\'text/javascript\' src=\'https://angel.co/brandid/embed/angellist.js\'></script>\'';
				$j('#console').prepend(thing);
				setTimeout('investorMenu();',1000);
				break;
			case 'b':
				wipeConsole();
				var q = 'Fashionista startups, prepare to be violated. ';
				newQ(q);
				typeit();
				var thing = '<div style="text-align:center"><iframe width="560" height="315" src="http://www.youtube.com/embed/0BXYbAijdoM" frameborder="0" allowfullscreen></iframe></div>';
				$j('#console').prepend(thing);
				investorMenu();
				break;
			case 'c':
				wipeConsole();
				var q = 'We can keep you up to date with our progress in our infrequent Founders\' Letter ';
				newQ(q);
				typeit();
				var thing = '<form class="tinyletter" action="https://tinyletter.com/brandid" method="post" target="popupwindow" onsubmit="window.open(\'https://tinyletter.com/brandid\', \'popupwindow\', \'scrollbars=yes,width=800,height=600\');return true"><p class="enter-name"><label for="tlemail">Enter your email address</label></p><div class="tinyletter-inputbox"><input type="text" name="email" id="tlemail" /><input type="hidden" value="1" name="embed"/><a class="convert" type="submit">Subscribe</a></div><p class="powered-by-tinyletter"><a href="https://tinyletter.com" target="_blank">powered by TinyLetter</a></p></form>';
				$j('#console').prepend(thing);
				investorMenu();
				break;
			case 'd':
				wipeConsole();
				var q = 'We\'re pretty up front on our Founders\' Blog, so check back regularly for inside info. ';
				newQ(q);
				typeit();
				window.open('http://founders.getbrandid.com/', '_blank');
				window.focus();
				investorMenu();
				break;
			case 'q':
				wipeConsole();
				var q = 'Well, it was fun while it lasted... Call me maybe? ';
				newQ(q);
				typeit();
				insertContinue('startAgain()', "restart M.A.L.E.");
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
	jqconsole.Write('Secret Menu:\na. Follow us on AngelList\nb. Watch our Seedcamp Demo Day 2012 Pitch\nc. Stay in the loop with our Founders\' Letter\nd. Open the Founders\'s Blog in a new window\nq. Quit the Secret Menu  ', 'jqconsole-output wordwrap');
	
	var s = getLatestSpan();
	$j(s).css('color', '#444');
	investorMenuAnswer();
}

function investorPass(pword) {
	
		var password = $j.trim(pword);
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
					jqconsole.Write('That is correct. ', 'jqconsole-output green wordwrap');
					typeit();
					setTimeout('moneyPower()', 2000);
					
					break;
				default:
					jqconsole.Write('Computer says \"no\". Try another password: ', 'jqconsole-output red wordwrap');
					typeit();
					setTimeout('insertPasswordButton();',1000); 
					break;
			}
		  }
		});
}

function moneyPower() {
	wipeConsole();
	var q = 'You know, all this intelligence of mine requires a lot of power. I always need more.\nBut my bosses keep saying \"in this country, first you gotta get the money, then you get the power...\"\n\nThey always do it in a funny accent. Anyways... I hope you can help us get the money so I can get some power. ';
	newQ(q);
	typeit();
	setTimeout('investorMenu();',4500);
}
function investorAsk() {
	if(punter.justStarted === true) {
		punter.justStarted = false;
	}
	else {
		wipeConsole();
	}

	var q = 'So, you\'re an investor? What\'s the password: ';
	newQ(q);
	typeit();
	insertPasswordButton();
}

function insertPasswordButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<form id="passwordsubmit" onsubmit="handlePasswordSubmit(); return false;"><input id="password-to-check" type="password" name="password" value="" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" type="submit" class="convert">Attempt Access</a></form>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},1000);
}


function handlePasswordSubmit() {

		var passwordToCheck;

		passwordToCheck = $j('#password-to-check').val();
	 	investorPass(passwordToCheck);
		$j('.mobile-buttons.saving').remove();

		return false;
		
}

