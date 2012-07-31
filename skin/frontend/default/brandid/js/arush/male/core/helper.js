function initiate() {
		//give the header an id, this saves complications down the line
        $j('.jqconsole-header span').attr('id','male-welcome-msg');
        $j('pre.jqconsole').css('position','relative');
        $j('#male-welcome-msg').typewriter();
        $j('#male-welcome-msg').css('color', '#444');
    	window.scrollTo(0,0);
    	// jqconsole.Focus;
    	$j('pre').attr('disabled','true');
    	$j('pre').attr('readonly','readonly');
    	/mobile/i.test(navigator.userAgent) && setTimeout(function () {
		  window.scrollTo(0, 1);
		}, 1000);
}

function stopKeyboard(e){
	e.stopPropagation();
}

function correctResponse(responseString) {
		jqconsole.Write(responseString, 'jqconsole-output green wordwrap');
		typeit();
}

function wipeConsole() {
	if(jqconsole.GetState() === 'prompt') {
	 	jqconsole.AbortPrompt();
	}
	jqconsole.Reset();
	jQuery('#console').html('');
	jqconsole = null;
	window.scrollTo(0,0);
}

function clearDefaultJ(el) {
	/* jquery version of clearDefault defined elsewhere */
  		if (el.defaultValue===el.value) {
  			el.value = "";
		    $j('#subscribe_btn').removeClass('disabled');
		}
	}
function restoreTextJ(el) {
	/* jquery version of restoreText defined elsewhere */
	if (el.value === "") {
		el.value = el.defaultValue;
	}
}



function adjustHeight(step) {
	return false;
	switch(step) {
		case 'work':
			$j('.male-console').css('height','640px');
			break;
		case 'beckham':
			var newHeight = parseInt($j('.img-container.one.offside.beckham').css('height')) + 120;
			newHeight += 'px';
			$j('.male-console').css('height',newHeight);
			break;
		case 'email':
			var newHeight = parseInt($j('#male-welcome-msg').css('height')) + 20;
			newHeight += 'px';
			alert(newHeight);
			$j('.male-console').css('height',newHeight);
		default:
			var newHeight;
			newHeight = parseInt($j('.mobile-buttons').css('height')) + parseInt($j('.jqconsole-header').css('height')) + 100;
			newHeight += 'px';
			$j('.male-console').css('height',newHeight);
			break;
	}
	
}

function newQ(q) {
	jqconsole = $j('#console').jqconsole(q, ' >>> ');
	initiate();
	adjustHeight('new');
	$j('#male-welcome-msg').typewriter();
    $j('#male-welcome-msg').css('color', '#444');
}

function performAppend(span, string) {
	// get length of span, multiply by typeDelay to get delay required to display image
	var s = span;

	$j(s).parent().append(string);
}

function getLatestSpan() {
	var e = $j('.jqconsole-output span');
	var count = e.length-1;
	var latest = $j(e)[count];
	return latest;
}

function getDelayRequired() {
	var s = getLatestSpan();
	var delay = $j(s).text().length;
	delay = delay*typingDelay;
	return delay;
}

function typeit() {
		/* types the latest element of the matched object passed */
		var s = getLatestSpan();
		var randomId = 'male' + (Math.floor(Math.random()*10000000)+1);
		$j(s).attr('id',randomId);
		/* scroll while typing */
		
	    $j('#'+randomId).typewriter();
		$j('#'+randomId).css('color', '#444');

}
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearMobileButtons() {
	$j('.mobile-buttons').remove();
}
