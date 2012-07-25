function insertButtons(buttons) {
	/* buttons[0][0] = class
		buttons[0][1] = text
		buttons[0][2] = onclick function
		*/

	var n = buttons.length;
	var i;
	var s = getLatestSpan();
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

function insertEmailButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="email-to-save" type="email" name="email" value="Enter your email address…" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleEmailSubmit(); return false;">Save Progress</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
	setTimeout(function(){bindSaveHandler('email')},2200);

	

}

function insertNameButton() {

	var s = $j("#console");

	var string = '<div class=\"mobile-buttons saving clearfix\">';
	string += '<input id="name-to-save" type="text" name="firstname" value="e.g. Steve" onFocus="clearDefaultJ(this)" onBlur="restoreTextJ(this)"/><a id="submit_email" class="convert" onclick="handleNameSubmit(); return false;">Feed the Male™</a>';
	
	string += "</div>";
	
	setTimeout(function(){performAppend(s,string)},2000);
	setTimeout(function(){bindSaveHandler('email')},2200);

	

}