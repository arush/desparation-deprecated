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

function insertContinue(nextStep) {
	// stop automatic continue from happening
	clearTimeout(punter.currentTimer);
	var string = "<div class=\"mobile-buttons clearfix\"><a class=\"continue convert\" onclick=\""+nextStep+"\">Continue</a></div>";

	var s = $j('#male-welcome-msg').parent();
	performAppend(s,string);
	adjustHeight();
}