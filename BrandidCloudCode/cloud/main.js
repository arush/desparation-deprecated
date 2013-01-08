// Use Parse.Cloud.define to define as many cloud functions as you want.


var brandid = require('cloud/brandid.js');

// update customers data to other BRANDiD systems (mailchimp, intercom etc...)

Parse.Cloud.afterSave("_User", function(request) {

	// only execute this if user has an email address
	// this is needed because when users register with facebook, afterSave is triggered with no email. Email is saved to the user later.

	console.log('value of request is: ' + JSON.stringify(request));

	// if(typeof(request.object.email) !== "undefined") {

		var requestUri = 'https://'+brandid.api.user+':'+brandid.api.password+'@'+brandid.api.host;

		Parse.Cloud.httpRequest({
		  method: 'POST',
		  url: requestUri,
		  // by setting the header, Parse auto converts body to JSON
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  
		  body: request.object,

		  success: function(httpResponse) {
		  	// returns true or false from node-mailchimp API wrapper
		    console.log('sent user to brandid nodejitsu');
		  },
		  error: function(httpResponse) {
		    console.error('Request failed with response code ' + httpResponse.status + ' and data ' + httpResponse.data);
		  }
		});
	// }

});
