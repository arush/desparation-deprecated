/**
 * HelperService Module
 *
 *  Functions that are required across the whole app
 */

angular.module('HelperServices', []) 


.factory('HelperService', function () {
    
    
    var HelperService = {
		name: "Helper",

		getKey: function() {
			var key = '5wZ821rKIQ804Xe';
			return key;
		},

		getDevOrLive: function() {

			// as long as the live site is the only one using www, then this returns true if live

			var liveStatus = false;

			var host = window.location.host;
			var hostSplit = host.split(".");

			if(hostSplit[0] === "www") {
			  liveStatus = true;
			} else {
			  liveStatus = false;
			}

			return liveStatus;
		},

		// this function is to restrict access to the success page so as not to accidentally trigger conversion metrics
		authorizeSuccessKey: function(key) {

			var authorized = false;
			var authorizedKey = this.getKey();

			if(key === authorizedKey) {
				authorized = true;
			}


			return authorized;
		}
	}
	

    // The factory function returns ParseService, which is injected into controllers.
    return HelperService;
});

