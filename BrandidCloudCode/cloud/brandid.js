
// var vars;

// Get environment

// Parse.Cloud.define("getConfig", function(request, response) {
	

	

// });


exports.getConfig = function(configOption) {
	var configValue;

	var query = new Parse.Query("Config");
	query.equalTo("configOption", configOption);
	query.first({
		success: function(result) {

			configValue = result.get("configValue");

		},
		error: function(error) {
			// assume dev if nothing found
			configValue = "dev";
		}
	});

	return configValue;
};


// Parse.Cloud.run("getConfig", {configOption: "parse-environment"}, {
// 	success: function(environment) {

// 		if(environment === "production") {
// 		// communicate to LIVE BRANDiD site
// 			vars = {
// 				api : {
// 					host : "brandid-webhooks.jit.su/user/new",
// 					user : "qzvYxdrEWqarimiLkTTW3mwNS1B8ozwJm5OtXTdcrjayveJLgAEs3zfmYGRNWhi",
// 					password : "kU41vomnyF1RVncSy7LlHFLp48lj8LS7i3ojMyJY02Bq0aGJ3nMOoTgwx5z4st2"	
// 				}
// 			};
// 		} else {
// 			// communicate to DEV BRANDiD site
// 			// TODO: make DEV API
// 			vars = {
// 				api : {
// 					host : "brandid-webhooks.jit.su/user/new",
// 					user : "qzvYxdrEWqarimiLkTTW3mwNS1B8ozwJm5OtXTdcrjayveJLgAEs3zfmYGRNWhi",
// 					password : "kU41vomnyF1RVncSy7LlHFLp48lj8LS7i3ojMyJY02Bq0aGJ3nMOoTgwx5z4st2"	
// 				}
// 			};
// 		};
// 		console.log(environment);
// 	},
// 	error: function(dev) {
// 		// always returns "dev"

// 		// TODO: make DEV API
// 		vars = {
// 			api : {
// 				host : "brandid-webhooks.jit.su/user/new",
// 				user : "qzvYxdrEWqarimiLkTTW3mwNS1B8ozwJm5OtXTdcrjayveJLgAEs3zfmYGRNWhi",
// 				password : "kU41vomnyF1RVncSy7LlHFLp48lj8LS7i3ojMyJY02Bq0aGJ3nMOoTgwx5z4st2"	
// 			}
// 		};
// 	}
// });

// console.log(vars);

// exports.vars = vars;