
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

var brandid = require('cloud/brandid.js');

// update customers data to other BRANDiD systems (mailchimp, intercom etc...)

Parse.Cloud.afterSave("_User", function(request) {


	var environment = brandid.getConfig('parse-environment');
	var vars;

	if(environment === "production") {
	// communicate to LIVE BRANDiD site
		vars = {
			api : {
				host : "brandid-webhooks.jit.su/user/new",
				user : "qzvYxdrEWqarimiLkTTW3mwNS1B8ozwJm5OtXTdcrjayveJLgAEs3zfmYGRNWhi",
				password : "kU41vomnyF1RVncSy7LlHFLp48lj8LS7i3ojMyJY02Bq0aGJ3nMOoTgwx5z4st2"	
			}
		};
	} else {
		// communicate to DEV BRANDiD site
		// TODO: make DEV API
		vars = {
			api : {
				host : "brandid-dev.jit.su/user/new",
				user : "qzvYxdrEWqarimiLkTTW3mwNS1B8ozwJm5OtXTdcrjayveJLgAEs3zfmYGRNWhi",
				password : "kU41vomnyF1RVncSy7LlHFLp48lj8LS7i3ojMyJY02Bq0aGJ3nMOoTgwx5z4st2"	
			}
		};
	};

	console.log(environment);


	var requestUri = 'https://'+vars.api.user+':'+vars.api.password+'@'+vars.api.host;


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
	    console.log('completed');
	  },
	  error: function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status + ' and data ' + httpResponse.data);
	  }
	});

});

Parse.Cloud.define("hello", function(request, response) {
  response.success("tried!");
});
