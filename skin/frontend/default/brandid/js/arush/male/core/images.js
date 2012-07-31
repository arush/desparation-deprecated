function insertImageButtons(buttons, imageClass) {
	/* buttons[0][0] = class
		buttons[0][1] = text
		buttons[0][2] = onclick function
		*/
	var n = buttons.length;
	var i = 0;

	for (i=0; i<n; i++) {
		var className = buttons[i][0];
		var string = "<div class=\"mobile-buttons\"><a class=\""+className+"\" onclick=\""+buttons[i][2]+"\">"+buttons[i][1]+"</a></div>";
		
		//find the image for this button and print it
		var s = $j('#'+imageClass+'-option'+(i+1));

		performAppend(s,string);
	}
}

function printImage(images, link) {
	//url is an array with n number of urls

	var string = "<div class=\"image-question clearfix\">";
	var columns = "";
	var n = images.length;
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
		case 4:
			columns = "four";
			break;
	}

	for (i=0; i<n; i++) {
		string += "<a href=\"#\" onclick=\""+images[i][3]+"\"><div class=\"img-container "+columns+" "+images[i][1]+"\"><img class=\"scale-with-grid\" src=\""+images[i][0]+"\" id=\""+images[i][1]+"-option"+(i+1)+"\" alt=\"image option"+(i+1)+"\"/><span class=\"image-caption\">"+images[i][2]+"</span></div></a>";
	}

	string += "</div>";
	return string;
}