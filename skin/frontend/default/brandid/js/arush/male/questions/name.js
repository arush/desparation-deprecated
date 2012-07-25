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
	    else if(input.toLowerCase() === 'male') {
	    	jqconsole.Write(name + '? Really? Somehow I doubt that. Try again: ', 'jqconsole-output red wordwrap');
            typeit();
            startPrompt();
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
	var last2 = str.charAt(str.length-2)+last;

	if(
		/* rules */
		(last == 'a'
		|| last == 'e'
		|| last == 'y'
		|| last2 == 'in'
		|| last2 == 'ah'
		|| last2 == 'en'
		|| last2 == 'an'
		|| last2 == 'yn'
		|| last2 == 'er')
		&&
		/* exceptions */
		(str != 'steve'
		&& str != 'sean'
		&& str != 'sachin'
		&& str != 'edwin'
		&& str != 'nitin'
		&& str != 'ian' 
		&& str != 'bryce' 
		&& str != 'mike'
		&& str != 'harry'
		&& str != 'male' )

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