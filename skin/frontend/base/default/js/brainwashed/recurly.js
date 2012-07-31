jQuery.noConflict();


function loadRecurly(recurlySubdomain, mageCurrency, mageCountry, sku, customerId, callBack, customerEmail, recurlySignature, transactionType) {
	// $('co-payment-form').on('change', 'input[type="radio"][payment\[method\]]', function(e){
	// 	preLoadRecurly();
	// 	//loadRecurly(recurlySubdomain, mageCurrency, mageCountry, sku, customerId, callBack, customerEmail, recurlySignature, transactionType);
	// });
	
	Ajax.Responders.register({
		onComplete: function(request) {
			if (request.url.indexOf('checkout/onepage/progress') >= 0) {
				preLoadRecurly();
				//loadRecurly(recurlySubdomain, mageCurrency, mageCountry, sku, customerId, callBack, customerEmail, recurlySignature, transactionType);			
			}
		}
	});
	
	Recurly.config({
		subdomain: recurlySubdomain
		, currency: mageCurrency
		, country: mageCountry
	});
	var accountInfo = {
		  firstName: $('billing:firstname') ? $('billing:firstname').value : ''
		, lastName: $('billing:lastname') ? $('billing:lastname').value : ''
		, email: $('billing:email') ? $('billing:email').value : customerEmail
		, phone: $('billing:telephone') ? $('billing:telephone').value : ''
	}
	var billingInfo = {
		firstName: $('billing:firstname') ? $('billing:firstname').value : ''
		, lastName: $('billing:lastname') ? $('billing:lastname').value : ''
		, address1: $('billing:street1') ? $('billing:street1').value : ''
		, address2: $('billing:street2') ? $('billing:street2').value : ''
		, country: $('billing:country_id') ? $('billing:country_id').value : ''
		, city: $('billing:city') ? $('billing:city').value : ''
		, state: $('billing:region') ? $('billing:region').value : ''
		, zip: $('billing:postcode') ? $('billing:postcode').value : ''
	}
	var isRecurly = false;
	$('co-payment-form').select('input[type="radio"][payment\[method\]]').each(function(obj){
		if (obj.checked == true && obj.value == 'recurly') {
			isRecurly = true;
			$('payment-buttons-container').hide();
			$('opc-review').hide();
			
			if(!$('recurlyDiv')) { //added this otherwise more recurly divs were being added on every load
				$('p_method_recurly').up('dt').insert(new Element('div', { id: 'recurlyDiv', 'class': 'recurlyDiv' }));
			}

			if (transactionType == 'once-off') {
				Recurly.buildTransactionForm({
			    	target: '#recurlyDiv'
					, accountCode: customerId
					, successURL: callBack
					, distinguishContactFromBillingInfo: false
					, collectCompany: true
					, account: accountInfo
					, billingInfo: billingInfo				
					, signature: recurlySignature
				});			

			} else {
				
				Recurly.buildSubscriptionForm({
			    	target: '#recurlyDiv'
					, planCode: sku
					, accountCode: customerId
					, successURL: callBack
					, distinguishContactFromBillingInfo: false
					, collectCompany: true
					, account: accountInfo
					, billingInfo: billingInfo				
					, signature: recurlySignature
					, afterInject: recurlyTooltip
				});
				
			}			

			throw $break;
		}
	});

	

	if (!isRecurly) {
		$('payment-buttons-container').show();
		$('opc-review').show();
		if ($('recurlyDiv')) {
			$('recurlyDiv').remove();		
		}

	}
}
