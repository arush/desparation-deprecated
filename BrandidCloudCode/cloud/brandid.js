var liveAppId = "cWsBzcLQQMy80sF7KOYWPkeVKDxshxQWUwWk1b27";

if(Parse.applicationId === liveAppId) {
	// communicate to LIVE BRANDiD site
	exports.api = {
		host : "brandid-webhooks.jit.su",
		user : "5q77xr3mKN",
		password : "8l90tg3M4c"	
	};

} else {
	// communicate to DEV BRANDiD site
	exports.api = {
		host : "brandid-dev.jit.su",
		user : "qzvYxdrEWq",
		password : "kU41vomnyF"	
	};
};