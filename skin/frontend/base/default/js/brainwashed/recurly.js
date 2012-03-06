jQuery.noConflict();

document.observe('dom:loaded', function(){
	Ajax.Responders.register({
		onComplete: function(request) {
			if (request.url.indexOf('checkout/onepage/progress') >= 0) { loadRecurly(); }
		}
	});

	$('co-payment-form').on('change', 'input[type="radio"][payment\[method\]]', function(e){
		loadRecurly();
	});
})
