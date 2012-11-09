

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

// change the buttons depending on MALE progress
$j(document).ready(function() {
	if($j.cookie('punter') != null) {
		punter = JSON.parse($j.cookie("punter"));
		if(punter.progress === 'finalSave') {
			$j('#male-welcome-msg').text('Hey '+punter.fname+', I\'ve got the perfect plan for you.');
			$j('.mobile-buttons.saving input').remove();
			$j('#step1').show();
			$j('#step3').show();
			$j('#submit_email').css('float','left');
			$j('#submit_email').text('Step 2. Plan Configurator');
			$j('#submit_email').attr('href','/mens-clothing.html');
			$j('#main-step-1').addClass('secondary');
			$j('#main-step-2').removeClass('inactive');
			$j('#main-step-2').attr('href','/mens-clothing.html');
			$j('#header-convert').text('Step 2. Plan Configurator');
			$j('#header-convert').attr('href','/mens-clothing.html');
			$j('#middle-body-convert').text('Step 2. Plan Configurator');
			$j('#middle-body-convert').attr('href','/mens-clothing.html');
			$j('#body-convert-2').text('Step 2. Confirm your Plan');
			$j('#body-convert-2').attr('href','/mens-clothing.html');
		}
	}

	//male form submit
	$j('#malesubmit').submit(function() {
	  handleNameSubmit();
	  return false;
	});

});

$j(document).ready(function() {
	setTimeout("$j('#male-welcome-msg').typewriter()",5000);
		

});


//Male stuff
//global punter object
var punter = new Object();
if($j.cookie('punter') != null) {
	punter = JSON.parse($j.cookie("punter"));
}

function handleNameSubmit() {
		$j('#submit_email').addClass('secondary');
		$j('#submit_email').addClass('submitted');
		$j('#submit_email').text('Hold tight...');

		var nameToSave;

		nameToSave = $j('#name-to-save').val();

		// in case they entered 2 names, just take the first name before the space
	 	nameToSave = nameToSave.split(" ");
	 	punter.fname = nameToSave[0];
	 	punter.justStarted = true;
	 	$j.cookie('punter', JSON.stringify(punter), { expires: 1, path: '/' });

	 	
		window.location.href = '/get/party/started';
	
}


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

