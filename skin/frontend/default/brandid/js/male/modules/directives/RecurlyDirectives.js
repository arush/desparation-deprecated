var Recurlyjs = angular.module('recurlyjs', [])

.directive('recurlyjs', ['DataService','$http', function(DataService, $http) {
	return {
		restrict: 'E',
		template:'<div id="recurlyDiv"><div class="loading recurly-loading"></div></div>',
		replace:true,
		// transclude:false,
		scope: {
			payload: '=',
			user: '=',
			callback: '=' // this calls the parent controller's function defined in the markup
		},
		link:function (scope, element, attrs) {


			// set up Recurlyjs globals

			Recurly.config({
					subdomain: scope.payload.subdomain
				, currency: scope.payload.currency
			});


			// set up form defaults

			var accountInfo = {
				  firstName: ''
				, lastName: ''
				, email: ''
				, phone: ''
			};

			var billingInfo = {
					firstName: ''
				, lastName: ''
				, address1: ''
				, address2: ''
				, city: ''
				, state: ''
				// , country: '' // must leave this out because Recurly detects current country
				, zip: ''
			};

			var user = scope.payload.user; // cleaner to read and its faster to execute

			if(typeof user.get("first_name") !== "undefined") {
				accountInfo.firstName = user.get("first_name");
				billingInfo.firstName = user.get("first_name");
			}

			if(typeof user.get("last_name") !== "undefined") {
				accountInfo.lastName = user.get("last_name");
				billingInfo.firstName = user.get("last_name");
			}

			if(typeof user.get("email") !== "undefined") {
				accountInfo.email = user.get("email");
			}

			if(typeof user.get("phone") !== "undefined") {
				accountInfo.phone = user.get("phone");
			}
				


			var signature; // once ajax call is complete, this is where we store the Recurly.js signature

			var paramsToSign = scope.payload.params;

			// console.log(scope.payload.params);

			// send off the request for signature
			var promise = DataService.cloud.signRecurlyParams(paramsToSign, scope);

			promise.then(function(result) {
				signature = result.text;

				switch(scope.payload.transactionType) {
					case 'one-off':
						Recurly.buildTransactionForm({
					    
					    // defaults
					    	target: '#recurlyDiv'
					    , signature: signature
					    , collectCompany: false
							, distinguishContactFromBillingInfo: false

					    // form specifics
					    , transaction: scope.payload.params.transaction
							, accountCode: scope.payload.accountCode
							
							// pre-filled
							, account: accountInfo
							, billingInfo: billingInfo
							
							, successHandler: scope.callback
							// , afterInject: recurlyPostProcess
						});
						break;
					case 'subscription':
						Recurly.buildSubscriptionForm({
					    
					    // defaults
					    	target: '#recurlyDiv'
					    , signature: signature
							, collectCompany: false
							, distinguishContactFromBillingInfo: false

					    // form specifics
							, planCode: scope.payload.sku

							// pre-filled
							, account: accountInfo
							, billingInfo: billingInfo

							, successHandler: scope.callback
							// , afterInject: recurlyPostProcess
						});
						break;
					case 'billing':
						Recurly.buildBillingInfoUpdateForm({

							// defaults
								target: '#recurlyDiv'
							, signature: signature
							, collectCompany: false
							, distinguishContactFromBillingInfo: false
							, addressRequirement: 'zipstreet'
							
							// form specifics
							, accountCode: scope.payload.params.account.account_code
							
							// pre-filled
							, account: accountInfo
							, billingInfo: billingInfo

							, successHandler: scope.callback
							// , afterInject: recurlyPostProcess
						});
						break;
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