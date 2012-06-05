/*
* Author: Arush Sehgal
* Purpose: when you select an option for a plan, it stores your choice in a cookie, then when you check out, it adds the correct add-ons in recurly
* Date: 03 June 2012
*/

function configurePlan(el) {

	// id is needed to find the unselected item
	var dropdownId = $j(el).attr('id');
	var str = $j(el).parent().parent().attr('class');
	var selection = el.options[el.selectedIndex];

	if(str.indexOf("tshirt-bg")) {
		var itemToUpgrade = "upgrade_tees";
	}
	else if(str.indexOf("shirt-bg")) {
		var itemToUpgrade = "upgrade_shirts";
	}
	
	var amountToAdd = parseInt($j(selection).attr('price'));
	// if + exists, set the cookie and change the price, else delete it and deduct the price
	if(amountToAdd > 0) {
		$j.cookie(itemToUpgrade, amountToAdd);
		
		// get amount to add
		var currentPrice = parseInt($j('#final-price').text());
		$j('#final-price').text(currentPrice+amountToAdd);
	} else { // must subtract price when selecting the cheaper option, but first double check cookie exists
		if($j.cookie(itemToUpgrade)) {
			var amountToSubtract = $j.cookie(itemToUpgrade);
			var currentPrice = parseInt($j('#final-price').text());
			$j('#final-price').text(currentPrice-amountToSubtract);
			$j.cookie(itemToUpgrade,0);
		}
	}

	// had to remove this from inline js in core hack, replaced with configurePlan, so have to call it now
	opConfig.reloadPrice();

}
