/**
 * HelperService Module
 *
 *  Functions that are required across the whole app
 */

angular.module('HelperServices', []) 

.factory('HelperService', function () {
    
    
    var HelperService = {
		name: "Helper",

		metrics: {
			trackPage: function(trackPage) {
				/* KISSmetrics Tracking */
				if(typeof(_kmq) !== "undefined") {
					_kmq.push(['record', 'Reached ' + trackPage]);
				}
				/* Mixpanel Tracking */
				if(typeof(mixpanel) !== "undefined") {
					mixpanel.track('Reached ' + trackPage);
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
			}
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
		}
	}
	

    // The factory function returns ParseService, which is injected into controllers.
    return HelperService;
});

