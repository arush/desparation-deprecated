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

		/* ========== BUTTON TITLE =================== */

		$j('#recurlyDiv .footer button.submit').text('Complete Purchase');



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


	} else if(
		countryShip === 'AT' ||
		countryShip === 'BE' ||
		countryShip === 'DE' ||
		countryShip === 'DK' ||
		countryShip === 'ES' ||
		countryShip === 'FI' ||
		countryShip === 'FR' ||
		countryShip === 'FO' ||
		countryShip === 'GR' ||
		countryShip === 'GL' ||
		countryShip === 'IE' ||
		countryShip === 'IT' ||
		countryShip === 'LU' ||
		countryShip === 'NL' ||
		countryShip === 'PT' ||
		countryShip === 'SE') {

			// can only perform click when current tab is active, otherwise breaks checkout
				if($j('#opc-payment').hasClass('active')) {
					// click free shipping and turn to read-only
					$j('.add_on_ship-eu-west').click();
				}


			// make all plan add_ons unclickable
			$j('.add_on_ship-eu-west').removeClass('add_on').addClass('add_on_readonly');
			// unhide it
			$j('.add_on_ship-eu-west').show();
	} else if(
		countryShip === 'BG' ||
		countryShip === 'CY' ||
		countryShip === 'CZ' ||
		countryShip === 'EE' ||
		countryShip === 'HU' ||
		countryShip === 'LT' ||
		countryShip === 'LV' ||
		countryShip === 'MT' ||
		countryShip === 'PL' ||
		countryShip === 'RO' ||
		countryShip === 'SK' ||
		countryShip === 'SI') {

			// can only perform click when current tab is active, otherwise breaks checkout
				if($j('#opc-payment').hasClass('active')) {
					// click free shipping and turn to read-only
					$j('.add_on_ship-eu-east').click();
				}


			// make all plan add_ons unclickable
			$j('.add_on_ship-eu-east').removeClass('add_on').addClass('add_on_readonly');
			// unhide it
			$j('.add_on_ship-eu-east').show();

	} else { // rest of world

			// can only perform click when current tab is active, otherwise breaks checkout
				if($j('#opc-payment').hasClass('active')) {
					// click free shipping and turn to read-only
					$j('.add_on_ship-intl').click();
				}


			// make all plan add_ons unclickable
			$j('.add_on_ship-intl').removeClass('add_on').addClass('add_on_readonly');
			// unhide it
			$j('.add_on_ship-intl').show();
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















