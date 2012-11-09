var nameA = function (input) {

	  	var name = $j.trim(input);
	  	name = name.toLowerCase();
      	name = capitaliseFirstLetter(name);


      	/* KISSmetrics tracking */
	    if(typeof(_kmq) !== "undefined") {
			_kmq.push(['record', 'Entered Name']);
	    	_kmq.push(['set', {'Firstname':name}]);
	    }

	    /* Mixpanel Tracking */
	   	if(typeof(mixpanel) !== "undefined") {
	   		mixpanel.track("Entered Name", {"Firstname": name});
	   		mixpanel.name_tag(name);
		}


	    var smallName = name.length <= 1;

	  	if(input.toLowerCase() === 'investor') {
	    	investorAsk();
	    }
	    else if(input.toLowerCase() === 'male') {
	    	var q = 'You said: Male ';
	    	newQ(q);
	    	typeit();
	    	jqconsole.Write(name + '? Really? Somehow I doubt that. Try again: ', 'jqconsole-output red wordwrap');
            typeit();
            insertNameButton();
	    }
	    else if(!smallName) {
	      	// strip whitespace, capitalise and save the name
	      	punter.fname = name;
	      	punter.maleAnswers = JSON.stringify('started');

	      	punter.sexGuess = genderGuess(name);
	      	

	        offside(punter.fname);
	    }
	    else {
	    	jqconsole.Write(name + '? Really? That\'s what mamma named you, huh?\n\nTry again buddy: ', 'jqconsole-output red wordwrap');
	            typeit();
	            insertNameButton();
	    }
};

function insertNameButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<form id="name-form" action="/get/party/started" class="name-form"><input id="name-to-save" type="text" name="firstname" value="e.g. Steve" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><button type="submit" id="submit_email" class="convert">Feed the M.A.L.E™</button></form>';
	
	string += "</div>";
	
	setTimeout(function(){
		performAppend(s,string);
		$j("#name-form").submit(function(event) {

			/* stop form from submitting normally */
			event.preventDefault();

			/* disable the button */
			$j('#name-to-save').attr('disabled', true);

			handleNameSubmit();

		});
	},800);
	// performAppend(s,string)
}

	/* attach a submit handler to the form */
	



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
		&& str != 'dave'
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
