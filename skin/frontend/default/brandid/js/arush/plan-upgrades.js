/*
* Author: Arush Sehgal
* Purpose: when you select an option for a plan, it stores your choice in a cookie, then when you check out, it adds the correct add-ons in recurly
* Date: 03 June 2012
*/

// function flushCookies() {
// 	$j.cookie("upgrade_tees", null);
// 	$j.cookie("upgrade_shirts", null);
// }

function addToPrice(a,item) {
	var currentPrice = parseInt($j('#final-price').text());
	$j('#final-price').text(currentPrice+a);
	$j('#'+item+'-text').fadeIn();
}

function subtractFromPrice(a,item) {
	var currentPrice = parseInt($j('#final-price').text());
	$j('#final-price').text(currentPrice-a);
	$j('#'+item+'-text').fadeOut();
}

function configurePlan(el) {

	// id is needed to find the unselected item
	var dropdownId = $j(el).attr('id');
	var str = $j(el).parent().parent().attr('class');
	var selection = el.options[el.selectedIndex];

	if(str.indexOf("tshirt-bg upgrade") >= 0) {
		var itemToUpgrade = "upgrade_tees";
	}
	else if(str.indexOf("shirt-bg upgrade") >= 0) {
		var itemToUpgrade = "upgrade_shirts";
	}
	else {
		opConfig.reloadPrice();
		return;
	}
	//alert("item to upgrade: " + itemToUpgrade + " str: "+str);

	amountToAdd = parseInt($j(selection).attr('price'));
	// store the index of the selected option
	var valueToStore = parseInt(
			$j("#"+dropdownId+" option").index($j("#"+dropdownId+" option:selected"))
		);

	// if + exists, set the cookie and change the price, else delete it and deduct the price
	if(valueToStore < 1) { // "Please select" is selected, so delete cookies
		if($j.cookie(itemToUpgrade)) {
			var amountToSubtract = $j.cookie(itemToUpgrade);
			subtractFromPrice(amountToSubtract,itemToUpgrade);

			$j.cookie(itemToUpgrade,null,{ path: '/'});
			$j.cookie(itemToUpgrade+"_val",null,{ path: '/'});
		}
		return;
	}
	else if(amountToAdd > 0) {
		$j.cookie(itemToUpgrade, amountToAdd,{ path: '/' , expires: 7});
		$j.cookie(itemToUpgrade+"_val", valueToStore,{ path: '/' , expires: 7});
		// recalculate price
		addToPrice(amountToAdd,itemToUpgrade);
		
	} else if(amountToAdd === 0) { // must subtract price when selecting the cheaper option, but first double check cookie exists
		if($j.cookie(itemToUpgrade)) {
			
			var amountToSubtract = $j.cookie(itemToUpgrade);
			subtractFromPrice(amountToSubtract,itemToUpgrade);
			
			$j.cookie(itemToUpgrade,0,{ path: '/' , expires: 7});
			$j.cookie(itemToUpgrade+"_val", valueToStore,{ path: '/' , expires: 7});
		}
	}

	// had to remove this from inline js in core hack, replaced with configurePlan, so have to call it now
	
}

