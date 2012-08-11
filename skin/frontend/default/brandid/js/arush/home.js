

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
			var w = document.body.offsetWidth;
			var h = document.body.offsetHeight;
			$j('#jr_overlay').css('width',w);
			$j('#jr_overlay').css('height',w);
			$j('body').css('overflow','hidden');
			$j('#jr_wrap').css('top',200);
			$j('#jr_wrap').css('left',0);
			window.setTimeout('aniMonth()', 200);
		}
	 
	});


function closeReject() {
		$j('#rejecter').remove();
		$j('body').css('overflow','scroll');
	}

function clearDefault(el) {
	if (el.defaultValue==el.value) {
			el.value = "";
	    $('subscribe_btn').removeClassName('disabled');
	}
}
function restoreText(el) {
	if (el.value == "") {
		el.value = el.defaultValue;
	}
}


// accordian
jQuery(function() {
			
	jQuery('#st-accordion').accordion({
		oneOpenedItem	: true
	});
	
});

//
$j(document).ready(function() {
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
		if(punter.progress === 'finalSave') {
			$j('#main-step-1').addClass('secondary');
			$j('#main-step-2').removeClass('inactive');
			$j('#main-step-2').attr('href','/plans.html');
			$j('#header-convert').text('Step 2. Confirm your Plan');
			$j('#header-convert').attr('href','/plans.html');
			$j('#middle-body-convert').text('Step 2. Confirm your Plan');
			$j('#middle-body-convert').attr('href','/plans.html');
			$j('#body-convert-2').text('Step 2. Confirm your Plan');
			$j('#body-convert-2').attr('href','/plans.html');
		}
	}
});

// sliding intro

	var trig = jQuery('#less-more');
	trig.data('open', false);
	var div  = jQuery('#long-welcome-msg');

	trig.click(function(e){
	    div.toggleClass('expanded');
	    trig.toggleClass('expanded');
	    if(trig.data('open') == true) {
	    	trig.text('read more');
	    	trig.data('open',false);
	    }
	    else { 
	    	trig.data('open',true);
	    	trig.text('read less');}
	});


	function hasClosed() {
		if($j.cookie('')) {

		}
	}
