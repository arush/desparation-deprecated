var $j = jQuery.noConflict();
	function fade1() {
		// find the element we want to fade *up*
	    var fade = $j('> div', $j('div.fade'));
	    // fade in quickly
	      fade.fadeIn(1000);
	
	    setTimeout('fade2()',2500);
	}
	function fade2() {
	    // on hovering out, fade the element out
	    var fade = $j('> div', $j('div.fade'));
	    // fade away slowly
	    fade.fadeOut(1000);
		  
		setTimeout('fade1()',2500);
    }

    function fadeCalendar() {
		$j('.month .month-title').fadeTo('slow', 0.3);

    	$j('.month .package-icon').fadeTo('slow', 0.2, function() {
	      // Animation complete.
	      setTimeout('loadCopy()',300);

	    });
    }

    function loadCopy() {
		$j('.copy').fadeTo('slow', 1);

    }

    function aniMonth() {
		var months = $j('.month .month-title').length;
		
		$j('.month .month-title').fadeTo('fast', 0.9);

		$j('.month .package-icon').fadeTo('fast', 0.9, function() {
	      // Animation complete.
	      setTimeout('fadeCalendar()',200);

	    });

	}

	// when the DOM is ready:
	$j(document).ready(function () {

	  	setTimeout('fade2()',3000);
	  	if(Modernizr.cssanimations) {
			return;
		}
		else {
			window.setTimeout('aniMonth()', 200);
		}
	 
	});

