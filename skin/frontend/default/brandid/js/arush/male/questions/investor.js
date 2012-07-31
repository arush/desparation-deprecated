function teamMenu() {
	
	jqconsole.Write('Secret Menu > Team Menu:\n\na. Open the team page in a new window\nb. Who is M.A.L.E™?\nc. Return to the Secret Menu ', 'jqconsole-output wordwrap');
	typeit();
	setTimeout('teamAnswer();',2000);
}

function teamAnswer() {
	$j('.jqconsole-prompt').css('display','block');
	$j('.jqconsole-input').css('display','block');
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				window.open("/keep/calm/wearepros","_blank");
				setTimeout('teamMenu();',1000);
				break;
			case 'b':
				wipeConsole();
				var q = 'My true identity can never be revealed. However I can tell you this:\n\nM.A.L.E™ is the Masculine Algorithmic Learning Engine. M.A.L.E™ is learning all the time. When you signup, when you feedback on your deliveries, when you upgrade/downgrade or need new stuff, M.A.L.E™ learns exactly what you need, exactly when you need it. ';
				newQ(q);
				typeit();
				setTimeout('teamMenu();',7000);
				break;
			case 'c':
				wipeConsole();
				var q = 'Returning to the Secret Menu... ';
				newQ(q);
				typeit();
				setTimeout('investorMenu();',1000);
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
	$j('.jqconsole-prompt').css('display','block');
	$j('.jqconsole-input').css('display','block');
	jqconsole.Prompt(true, function (input) {
		var answer = $j.trim(input);
		answer = answer.toLowerCase();
		switch(answer) {
			case 'a':
				wipeConsole();
				var q = 'Our team is the perfect mix of tech startup, retail, fashion, branding and comms entrepreneurs.\nAnd we are deadly serious about solving clothing shopping for men. Forever. ';
				newQ(q);
				typeit();
				setTimeout('teamMenu();',4000);
				break;
			case 'b':
				wipeConsole();
				var q = 'Men don’t like shopping. And while men want to look good, most wouldn’t claim to be interested in fashion. Ecommerce for men is too often just ecommerce for women with the pinks turned blue.\n\nWant to know more? Download our deck (option d). ';
				newQ(q);
				typeit();

				investorMenu();
				break;
			case 'c':
				wipeConsole();
				var q = 'BRANDiD is an online subscription service for all the things men need, starting with designer basics such as underwear, socks, tees and shirts from the likes of Dior, Calvin Klein and Ralph Lauren.\n\nBRANDiD is specifically designed for the way men want to shop – no hassle, no fuss, no fluff. Your average man only shops to solve a problem, and once dealt with, never wants to deal with it again. Select, subscribe, sorted.\n\nWant to know more? Download our deck (option d). ';
				newQ(q);
				typeit();
				investorMenu();
				break;
			case 'd':
				window.open("http://f.cl.ly/items/0C0F3k0e2F3E2A150B2u/angel%20deck.pdf","_blank");
				setTimeout('investorMenu();',1000);
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
	jqconsole.Write('Secret Menu:\na. Team\nb. What problem are you solving?\nc. What\'s the answer?\nd. View the investor deck\nq. Quit the Secret Menu  ', 'jqconsole-output wordwrap');
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
	wipeConsole();
	var q = 'So, you\'re an investor? What\'s the password: ';
	newQ(q);
	typeit();
	insertPasswordButton();
}

function insertPasswordButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="password-to-check" type="password" name="password" value="" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handlePasswordSubmit(); return false;">Attempt Access</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},1000);
}


function handlePasswordSubmit() {

		var passwordToCheck;

		passwordToCheck = $j('#password-to-check').val();
	 	investorPass(passwordToCheck);
		$j('.mobile-buttons.saving').remove();
	
}

