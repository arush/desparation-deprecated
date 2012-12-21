/**
 * HelperService Module
 *
 *  Functions that are required across the whole app
 */

angular.module('HelperServices', []) 

.factory('HelperService', ['$routeParams', function ($routeParams) {
    
    
    var HelperService = {
		name: "Helper",

		metrics: {
			track: function(event,payload) {
				/* KISSmetrics Tracking */
				if(typeof(_kmq) !== "undefined") {
					_kmq.push(['record', event, payload]);
				}
				/* Mixpanel Tracking */
				if(typeof(mixpanel) !== "undefined") {
					mixpanel.track(event,payload);
				}
			},

			identify: function(identity) {
				/* KISSmetrics Tracking */
				if(typeof(_kmq) !== "undefined") {
		            _kmq.push(['identify', identity]);
				}
				/* Mixpanel Tracking */
				if(typeof(mixpanel) !== "undefined") {
					mixpanel.identify(identity);
				}
			},
			setLastLogin: function() {
				var loginTime = new Date();
				var metricsPayload = {"$last_login": loginTime};

				/* KISSmetrics Tracking */
				if(typeof(_kmq) !== "undefined") {
		            _kmq.push(['record', 'Logged In', metricsPayload]);
				}
				/* Mixpanel Tracking */
				if(typeof(mixpanel) !== "undefined") {
					mixpanel.track('Logged In', metricsPayload);
					mixpanel.people.set(metricsPayload);
				}
			}
		},
		urls: {
			getBaseUrl: function() {
				var url = "//" + document.location.host + '/';
				return url;
			},
			getSkinUrl: function() {
				var baseUrl = this.getBaseUrl();
				var url = baseUrl + 'skin/frontend/default/brandid/';
				return url;	
			} 
		},

		format: {

			first_name: function(input) {
				var first_name = jQuery.trim(input);
				first_name = first_name.toLowerCase();
				first_name = this.capitaliseFirstLetter(first_name);
				return first_name;
			},

			capitaliseFirstLetter: function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		},

		isSaveNeeded: function(male_answers) {

			var saveNeeded = false;

			// if our questions or items change, this needs to be updated
			// TODO: refactor this so we can add more questions and items and it works automatically

			if(this.haveAnswersBeenSet(male_answers.boxers)) {
				saveNeeded = true;	
			} else if(this.haveAnswersBeenSet(male_answers.socks)) {
				saveNeeded = true;
			} else if(this.haveAnswersBeenSet(male_answers.tees)) {
				saveNeeded = true;
			} else if(this.haveAnswersBeenSet(male_answers.jumpers)) {
				saveNeeded = true;
			} else if(this.haveAnswersBeenSet(male_answers.hoodies)) {
				saveNeeded = true;
			}
			
			return saveNeeded;
		},

		haveAnswersBeenSet: function(answer) {
			var changed = false;

			if(typeof(answer.attributes.brands) !== "undefined") {
				if(answer.attributes.brands.length > 0) {
					changed = true;
				};
			};
			if(typeof(answer.attributes.size) !== "undefined") {
				if(answer.attributes.size !== "") {
					changed = true;
				}
			};
			if(typeof(answer.attributes.colours) !== "undefined") {
				if(answer.attributes.colours.length > 0) {
					changed = true;
				}
			};
			if(typeof(answer.attributes.specifics) !== "undefined") {
				if(answer.attributes.specifics !== "") {
					changed = true;
				}
			};

			return changed;
		},

		getKey: function() {
			var key = '5wZ821rKIQ804Xe';
			return key;
		},

		getEnvironment: function() {

			// as long as the live site is the only one using www, then this returns true if live

			var host = window.location.host;
			var hostSplit = host.split(".");

			
			return hostSplit[0];
		},

		// this function is to restrict access to the success page so as not to accidentally trigger conversion metrics
		authorizeSuccessKey: function(key) {

			var authorized = false;
			var authorizedKey = this.getKey();

			if(key === authorizedKey) {
				authorized = true;
			}


			return authorized;
		},
		getIntercomAppId: function() {
			var app_id;

			var environment = this.getEnvironment();
	        
	        if(environment === "www") {
		      // LIVE connection to Intercom
		      app_id = "myporahm";
		    } else if(environment === "hack") {
		      // DEV connection to Intercom
		      app_id = "2eqflc09";
		    } else {
		      // LOCAL connection to Intercom
		      app_id = "2eqflc09";
		    }

			return app_id;
		},
		setIntercomSettings: function(user) {
			// this relies on a global variable intercomSettings being defined somewhere
		    if(user !== null) {
		      
		      var email;
		      email = user.get("email");
		      
		      if(typeof(email) !== "undefined") {
		        
		        var createdAtTimeStamp = Math.round(user.createdAt.getTime() / 1000);
		        var intercomAppId = this.getIntercomAppId();
		        
		        // see if Facebook is connected
		        var facebookConnected = false;
		        if(user.get("authData")) {
		        	facebookConnected = true;
		        };

				intercomSettings = {
					// TODO: The current logged in user's email address.
					email: email,
					// TODO: The current logged in user's sign-up date as a Unix timestamp.
					created_at: createdAtTimeStamp,

					'Facebook Connected': facebookConnected,

					app_id: intercomAppId
				};
		      };
		    };
		},
		setIntercomLoggedOutSettings: function(user) {
	        var intercomAppId = this.getIntercomAppId();
			intercomSettings = {
	            // TODO: The current logged in user's email address.
	            email: "guest",
	            // TODO: The current logged in user's sign-up date as a Unix timestamp.
	            created_at: "guest",
	            app_id: intercomAppId
	        };
		}
	}
	

    // The factory function returns ParseService, which is injected into controllers.
    return HelperService;
}]);

