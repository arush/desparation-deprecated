// Use Parse.Cloud.define to define as many cloud functions as you want.


var brandid = require('cloud/brandid.js');

// update customers data to other BRANDiD systems (mailchimp, intercom etc...)

Parse.Cloud.afterSave("_User", function(request) {

	// only execute this if user has an email address
	// this is needed because when users register with facebook, afterSave is triggered with no email. Email is saved to the user later.

	console.log('value of request is: ' + JSON.stringify(request));

	// if(typeof(request.object.email) !== "undefined") {

		var requestUri = 'https://'+brandid.api.user+':'+brandid.api.password+'@'+brandid.api.host + '/user/new';
		console.log(requestUri);
		
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
		    console.error(httpResponse);
		  }
		});
	// }

});

// sign some parameters for Recurly.js checkout form

Parse.Cloud.define("signRecurlyParams", function(request, response) {
	
	var requestUri = 'https://' + brandid.api.user + ':' + brandid.api.password + '@' + brandid.api.host + '/recurly/sign';

	console.log(requestUri);
	console.log(request);

	Parse.Cloud.httpRequest({
	  method: 'POST',
	  url: requestUri,
	  // by setting the header, Parse auto converts body to JSON
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  
	  body: request.params,

	  success: function(signature) {
	  	// returns the signature
	  	response.success(signature);

	    console.log('successfully signed Recurly params');
	  },
	  error: function(httpResponse) {
	    console.error('Recurly signature request failed with response code ' + httpResponse.status + ' and data ' + httpResponse.data);
	    console.error(httpResponse);
	  }
	});
	

});

// keep systems updated when users configure Answers

Parse.Cloud.define("updateAnswers", function(request, response) {
	
	var requestUri = 'https://' + brandid.api.user + ':' + brandid.api.password + '@' + brandid.api.host + '/answers/update';

	console.log(requestUri);
	console.log(request);

	Parse.Cloud.httpRequest({
	  method: 'POST',
	  url: requestUri,
	  // by setting the header, Parse auto converts body to JSON
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  
	  body: request.params,

	  success: function(results) {
	  	// returns the signature
	  	response.success(results);

	    console.log('successfully sent updated answers to BRANDiD systems');
	  },
	  error: function(httpResponse) {
	    console.error('Answer update request failed with response code ' + httpResponse.status + ' and data ' + httpResponse.data);
	    console.error(httpResponse);
	  }
	});
	

});
