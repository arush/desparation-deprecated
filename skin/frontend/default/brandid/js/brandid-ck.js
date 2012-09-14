var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

/* **********************************************
     Begin checkoutHelpers.js
********************************************** */

function recurlyTooltip() {
	var toolDivAttrs = {
        'id'   : 'popover',
        'class'   : 'popover top'
    };
    
    var arrowDivAttrs = {
        'id'   : 'arrow',
        'class'   : 'arrow'
    };
	var popInnerAttrs = {
        'id'   : 'popover-inner',
        'class'   : 'popover-inner'
    };
    var popTitleAttrs = {
        'id'   : 'popover-title',
        'class'   : 'popover-title'
    };
    var popContentAttrs = {
        'id'   : 'popover-content',
        'class'   : 'popover-content'
    };
		
		// insert close tooltip
    var toolDiv = new Element('div', toolDivAttrs);
    var arrowDiv = new Element('div', arrowDivAttrs);
    var popInnerDiv = new Element('div', popInnerAttrs);
    var popTitleDiv = new Element('h3', popTitleAttrs);
    popTitleDiv.update('Return Like a Man&trade; (+£2.49)');
    var popContentDiv = new Element('p', popContentAttrs);
	popContentDiv.update('<p>Choose this and we\'ll arrange a free, fully insured courier to come pick up anything you want to return or exchange. Otherwise, no dramas, just post it back to us yourself if you want to return anything.</p>');

	jQuery('.add_ons.any').prepend(toolDiv);				
	jQuery('#popover').append(arrowDiv);
	jQuery('#popover').append(popInnerDiv);
	jQuery('#popover-inner').append(popTitleDiv);
	jQuery('#popover-inner').append(popContentDiv);

	//jQuery("#popover").css('display','none'); //start hidden

	jQuery(".add_on_return-like-a-man").hover(
	  function () {
	    jQuery("#popover").fadeIn(500);
	  },
	  function () {
	    jQuery("#popover").fadeOut(500);
	  }
	);				
	/* end insert cookie based close button */
}

function recurlyPostProcess(d){
	var $j = jQuery.noConflict();


	/* ========== PREPARE FORM =================== */

	var basket, basketItems, noBasket;

	if($j.cookie('basket') != null) {
		
		basketExists = true;
		// bring back the basket cookie

		basket = $j.parseJSON($j.cookie('basket'));
		basketItems = basket.basket;	

		// hide all add-ons if basket detected, enable as needed
		$j('.add_on').hide();
		// clear the default "Qty" text
		$j('.add_ons .quantity .placeholder').html('');

	} else {
		// no basket cookie, show full form
		basketExists = false;
	}

	// set helper variables

	// helper_trial stays false if basketExists === false
	var helper_trial = false;


	// the following actions are dependent on the basket cookie
	if(basketExists) {
		
		if(basket.frequency === 'trial') {
			helper_trial = true;
		}

		
		/* ========== PLAN TITLE =================== */

		$j('#recurlyDiv .recurring_cost .cost').hide();
		if(helper_trial) {
			$j('#recurlyDiv .plan .interval').html('billed only once');
		}


		/* ========== PLAN CONFIG OPTIONS ========== */

		var i, buildSelectorString;
		for(i=0; i < basketItems.length; i++) {

			buildSelectorString = '.add_on_';

			// get upgrade
			buildSelectorString += basketItems[i].recurlyCode;
			

			//hide this add-on if qty is 0
			if(basketItems[i].qty > 0) {

				// calculate total
				
				$j(buildSelectorString + ' .quantity input').val(basketItems[i].qty);
				$j(buildSelectorString + ' .name').prepend(document.createTextNode(basketItems[i].qty+'x '));
				$j(buildSelectorString).show();
				
				// can only perform click when current tab is active, otherwise breaks checkout
				if($j('#opc-payment').hasClass('active')) {
					$j(buildSelectorString).click();
				}
				
			}

			/* ====== FORMATTING ======= */

			// make all plan add_ons unclickable
			$j(buildSelectorString).removeClass('add_on').addClass('add_on_readonly');

			// remove the quantity input field
			$j(buildSelectorString + ' .quantity input').remove();

		}

	}


	
	/* ========== SHIPPING ===================== */

	var shipField = document.getElementById("shipping:country_id");
	var countryShip = shipField.options[shipField.selectedIndex].value;

	if(countryShip === 'GB') {
		
			// can only perform click when current tab is active, otherwise breaks checkout
				if($j('#opc-payment').hasClass('active')) {
					// click free shipping and turn to read-only
					$j('.add_on_ship-uk').click();
				}


			// make all plan add_ons unclickable
			$j('.add_on_ship-uk').removeClass('add_on').addClass('add_on_readonly');
			// unhide it
			$j('.add_on_ship-uk').show();


	}


	/* ========== KISSMETRICS ================= */

	// KISSmetrics track coupon use
	$j(".recurly .coupon .check").click(function() {
		var couponCode = $j('input.coupon_code').val();
		_kmq.push(['set', {'Coupon used':couponCode}]);
	});	
	

	/* ========== RETURNS ===================== */
	// recurlyTooltip();

	// /* preselect addons based on cookies */
	// if(jQuery.cookie('upgrade_tees') > 0) {
	// 	if(jQuery('.add_on_upgradetees').length > 0) {
	// 		jQuery('.add_on_upgradetees').click();
	// 	}
	// 	else if(jQuery('.add_on_upgrade-tees').length > 0) {
	// 		jQuery('.add_on_upgrade-tees').click();
	// 	}
	// }
	// if(jQuery.cookie('upgrade_shirts') > 0) {
	// 	if(jQuery('.add_on_upgradeshirts').length > 0) {
	// 		jQuery('.add_on_upgradeshirts').click();
	// 	}
	// 	else if(jQuery('.add_on_upgrade-shirts').length > 0) {
	// 		jQuery('.add_on_upgrade-shirts').click();
	// 	}
		
	// }
};

















/* **********************************************
     Begin brandid.js
********************************************** */

// @codekit-prepend "arush/browser-detect.js"
// @codekit-prepend "arush/checkout/checkoutHelpers.js"

document.observe('dom:loaded', function(){

	/* steve's slider */
	$$('.sliders .holder .slider').each(function(obj){
		var calculatedWidth = obj.select('ul li').length * parseInt(obj.select('ul li')[0].getStyle('width'));
		var margins = parseInt(obj.getStyle('margin-left'));
		margins += parseInt(obj.getStyle('margin-right'));
		obj.setStyle({ width: calculatedWidth + margins + 100 + 'px' });
	});
	
	$$('.sliders .holder .left').each(function(obj){
		obj.observe('click', function(){
			var target = obj.up().firstDescendant().firstDescendant().childElements()[obj.up().firstDescendant().firstDescendant().childElements().length-1];

			var lastChild = document.createElement('li');
			lastChild.innerHTML = target.innerHTML;
			target.remove();
			obj.up().firstDescendant().firstDescendant().insert({top: lastChild });
			target = lastChild;
			target.setStyle({ marginLeft: (parseInt(target.getStyle('width'))*-1) + 'px' })			
			var start = parseInt(target.getStyle('margin-left'));
			var end = start + parseInt(target.getStyle('width'));
			
			new Effect.Tween(
				target, start, end, { duration: 0.2	},
				function(p) { this.setStyle({marginLeft : p + "px" }) }
			);
		});	
	});
	$$('.sliders .holder .right').each(function(obj){
		obj.observe('click', function(){
			var target = obj.up().firstDescendant().firstDescendant().firstDescendant();
			var start = parseInt(target.getStyle('margin-left'));
			var end = start + (parseInt(target.getStyle('width')) * -1);
			new Effect.Tween(
				target, start, end, {
					duration: 0.2, afterFinish: function(){
						
						// if (end != parseInt(target.getStyle('width'))*-1) {
							var lastChild = document.createElement('li');
							lastChild.innerHTML = target.innerHTML;
							target.remove();
							obj.up().firstDescendant().firstDescendant().insert(lastChild);
						//}
					}
				},
				function(p) { this.setStyle({marginLeft : p + "px" }) }
			);
		});
	});
	

});

var count;

function doFade(el) {
		count = 0;
		nextLi = parseInt(el);
		el = "#" + el;
		
		fadeThings = jQuery("#popup-slide").children("ul").children("li").eq(nextLi).find(".fadein");
		
		var numFaders = fadeThings.size();
		
		var target;
		
		timer = setInterval(function() {
			if(count >= numFaders) { 
				clearInterval(timer);
			 }
			 else {
			 	target = fadeThings.eq(count);
			 	startFade(target);
				count++;
			 }
		}, 500);
		
	}

function startFade(el) {
		jQuery(el).animate({
			opacity: 1
			},500);

	}