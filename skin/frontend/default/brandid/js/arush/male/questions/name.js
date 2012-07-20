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