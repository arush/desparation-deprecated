jQuery.noConflict();

document.observe('dom:loaded', function(){

	$('checkoutSteps').select('.button').each(function(obj){
		obj.observe('click', function(e){
			loadRecurly();		
		})
	});

	$('co-payment-form').on('change', 'input[type="radio"][payment\[method\]]', function(e){
		loadRecurly();
	});
})
