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

function insertSkip(nextStep, buttonText) {
	// default button text is 'continue'
	buttonText = typeof buttonText !== 'undefined' ? buttonText : 'skip';
	
	var string = "<div class=\"mobile-buttons clearfix\"><a class=\"continue skip secondary convert\" onclick=\""+nextStep+"\">"+buttonText+"</a></div>";

	var s = $j('.male-console');
	performAppend(s,string);
	adjustHeight();
}

function insertShare(type, href) {
	var buttonText = 'Share this on '+type;
	var buttonClass = 'convert secondary '+type;

	var string = "<div class=\"mobile-buttons clearfix\"><a target=\"_blank\" href=\""+href+"\" class=\""+buttonClass+"\">"+buttonText+"</a></div>";

	var s = $j('#male-welcome-msg').parent();
	performAppend(s,string);
	adjustHeight();
}