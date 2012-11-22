/**
 * State Machine Module
 *
 *  A state machine using stately.js to control routing
 */
angular.module('StateMachines', []) 
/**
 * Boxers Machine
 */
.factory('BoxersMachine', function(){
    // Initialize Machine

    var BoxersMachine = Stately.machine({
	    'Q1': {
	        answer: function (answers) {
	            return this.Q2;
	        }
	    },
	    'Q2': {
	        answer: function (answers) {
	            return this.Q3;
	        }
	    },
	    'Q3': {
	        answer: function (answers) {
	            return 'Dashboard';
	        }
	    },
	    'Dashboard': {
	    	editQ1: function () {
	    		return this.Q1;
	    	},
	    	editQ2: function () {
	    		return this.Q1;
	    	},
	    	editQ3: function () {
	    		return this.Q1;
	    	}
		}
	}).bind(function (event, oldState, newState) {

	    var transition = oldState + ' => ' + newState;

	    switch (transition) {
	        /*
	        ...
	        case 'Q1 => Q2':
	        case 'Q3 => Dashboard':
	        ...
	        */
	        default:
	            console.log(transition);
	            break;
	    }
	});


    // The factory function returns BoxersMachine, which is injected into controllers.
    return BoxersMachine;
})

/**
 * StateMachine is a simple adapter that returns either the correct machine for the correct route
 * This service is injected into the Main? Controller
 */

.factory('StateMachine', function (BoxersMachine,$routeParams) {
  // default service as a fallback
  // var serviceToUse = DefaultService;
  var machineToUse = false;

  // check the $location.path to see if the machine can be read straight from there
  if ($routeParams.category === "boxers") machineToUse = BoxersMachine;

  return machineToUse;
});
