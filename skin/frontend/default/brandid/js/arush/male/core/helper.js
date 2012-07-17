function performAppend(span, delay, string) {
	// get length of span, multiply by typeDelay to get delay required to display image
	var s = span;
	var delayRequired = delay;
	
	setTimeout(function(){
		$j(s).parent().append(string);
	}, delayRequired);
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


function stopScrolling() {
	clearInterval(scroller);
}
function scrollPre() {
	$j("#console pre").animate({ scrollTop: $j("#console pre").prop("scrollHeight") - $j('#console pre').height() }, 1000);
}
function clearMobileButtons() {
	$j('.mobile-buttons').remove();
}
