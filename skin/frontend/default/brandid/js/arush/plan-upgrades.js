/*
* Author: Arush Sehgal
* Purpose: when you select an option for a plan, it stores your choice in a cookie, then when you check out, it adds the correct add-ons in recurly
* Date: 03 June 2012
*/

// function flushCookies() {
// 	$j.cookie("upgrade_tees", null);
// 	$j.cookie("upgrade_shirts", null);
// }

function correctNames(g) {
	var c=1;
	while(c < 3) {
		var realText = jQuery('.'+g+'-bg.upgrade select option:eq('+c+')').text();
		jQuery('#large_'+g+'s_option_'+c).text(realText);
		jQuery('#small_'+g+'s_option_'+c).text(realText);
		c++;
	}
}

function handleClick(el) {
	// find the item being chosen
	var e = $j(el);
	var id = e.attr('id');
	var t = id.split("_");
	var item = t[1];

	// remove 's' from item so can do a comparison between t-shirts and tshirt
	var lastChar = item.substr(item.length - 1);
	if(lastChar == 's') {
		itemNoS = item.substring(0, item.length-1); // remove last char
	}

	t.reverse();
	var index = t[0];
	// find the style being chosen
	var style = e.attr('title');

	$j('.style-chooser .'+item+'.active').removeClass('active');
	e.addClass('active');

	// mirror the active styles in the other element
	if(id.substring(0,6) === 'large_') {
		var newId = 'small_' + id.substring(6);
	}
	else {
		var newId = 'large_' + id.substring(6);
	}
	$j('#'+newId).addClass('active');


	// filter the images
	if(style == 'classic') {
		$j('img.filterable.'+item).filter('.disco').parent().fadeOut();
		$j('img.filterable.'+item).filter('.classic').parent().fadeIn();
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();

	}
	else if(style == 'disco') {
		$j('img.filterable.'+item).filter('.classic').parent().fadeOut();
		$j('img.filterable.'+item).filter('.disco').parent().fadeIn();	
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();
	}
	else if(style == 'designer-tee') {
		$j('img.filterable.'+item).filter('.designer-polo').parent().fadeOut();
		$j('img.filterable.'+item).filter('.designer-tee').parent().fadeIn();	
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();
	}
	else if(style == 'designer-polo') {
		$j('img.filterable.'+item).filter('.designer-tee').parent().fadeOut();
		$j('img.filterable.'+item).filter('.designer-polo').parent().fadeIn();	
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();
	}
	else if(style == 'work-shirt') {
		$j('img.filterable.'+item).filter('.designer-shirt').parent().fadeOut();
		$j('img.filterable.'+item).filter('.work-shirt').parent().fadeIn();	
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();
	}
	else if(style == 'designer-shirt') {
		$j('img.filterable.'+item).filter('.work-shirt').parent().fadeOut();
		$j('img.filterable.'+item).filter('.designer-shirt').parent().fadeIn();	
		$j('.'+item+'-prev-btn').hide();
		$j('.'+item+'-next-btn').hide();
	}
	else if(style == 'both') {
		$j('img.filterable.'+item).filter('.classic').parent().fadeIn();
		$j('img.filterable.'+item).filter('.disco').parent().fadeIn();
		$j('.'+item+'-prev-btn').show();
		$j('.'+item+'-next-btn').show();
	}

	// update text field and summary
		$j('.'+itemNoS+'-bg.style input').val(style);
		
		//rewrite summary
		var spanText = style.replace("-"," ");
		$j('#'+item+'_style-text span').text(spanText);
		$j('#'+item+'_style-text').removeClass('nobg');

	// select the dropdown equivalent
	if($j('.'+itemNoS+'-bg.upgrade select').length != 0) {
		dropdownElem = $j('.'+itemNoS+'-bg.upgrade select');
		dropId = dropdownElem.attr('id');

		$j('#'+dropId+' option').eq(index).attr("selected","selected");

		document.getElementById(dropId).onchange();
	}
	
}

function addToPrice(a,item) {
	var currentPrice = parseInt($j('#final-price').text());
	$j('#final-price').text(currentPrice+a);
	$j('#'+item+'-text').removeClass('nobg');
}

function subtractFromPrice(a,item) {
	var currentPrice = parseInt($j('#final-price').text());
	$j('#final-price').text(currentPrice-a);
	$j('#'+item+'-text').removeClass('nobg');

}

function configurePlan(el) {

	// id is needed to find the unselected item
	var dropdownId = $j(el).attr('id');
	var str = $j(el).parent().parent().attr('class');
	var selection = el.options[el.selectedIndex];

	if(str.indexOf("t-shirt-bg upgrade") >= 0) {
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
	
	opConfig.reloadPrice();
	// had to remove this from inline js in core hack, replaced with configurePlan, so have to call it now
	
}

