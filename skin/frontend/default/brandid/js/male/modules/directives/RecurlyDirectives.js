var Recurlyjs = angular.module('recurlyjs', [])

.directive('recurlyjs', ['DataService','$http', function(DataService, $http) {
	return {
		restrict: 'E',
		template:'<div id="recurlyDiv">test</div>',
		replace:true,
		// transclude:false,
		scope: {
			subdomain: '=',
			currency: '=',
			type: '=',
			payload: '=',
			callback: '=' // this calls the parent controller's function defined in the markup
		},
		link:function (scope, element, attrs) {

			Recurly.config({
					subdomain: scope.subdomain
				, currency: scope.currency
			});

			var signature; // once ajax call is complete, this is where we store the Recurly.js signature

			var promise = DataService.cloud.signRecurlyParams(scope.payload, scope);

			promise.then(function(result) {

				signature = result.text;

				switch(scope.type) {
					case 'one-off':
						Recurly.buildTransactionForm({
					    	target: '#recurlyDiv'
					    , signature: signature
					    , transaction: scope.transaction
					    , successHandler: scope.callback
							// , accountCode: 'arushsehgal@gmail.com'
							, distinguishContactFromBillingInfo: false
							, collectCompany: false
							// , account: accountInfo
							// , billingInfo: billingInfo				
						});
						break;
					case 'subscription':
						Recurly.buildSubscriptionForm({
					    	target: '#recurlyDiv'
					    , signature: signature
					    , successHandler: scope.callback
							, planCode: sku
							, accountCode: customerId
							, distinguishContactFromBillingInfo: false
							, collectCompany: false
							, account: accountInfo
							, billingInfo: billingInfo				
							// , afterInject: recurlyPostProcess
						});
						break;
					case 'billing':
						Recurly.buildBillingInfoUpdateForm({
							target: '#recurlyDiv'
						, signature: signature
						, collectCompany: false
						// , accountCode: "arushsehgal@gmail.com"
						, successHandler: scope.callback
							// accountCode: accountCode
						});
				}


			}, function(reason) {
			  // something went wrong in the API call, so init new object
			  console.log("Could not sign checkout form");
			  console.log(reason);
			  // male_answers.boxers = new Boxers();
			});


			
            
            // need to do stuff to the element when it is clicked
    }
	}
}]);