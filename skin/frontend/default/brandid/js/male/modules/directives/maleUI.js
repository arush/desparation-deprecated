var maleUI = angular.module('maleUI', [])

.directive('textTag', function() {
	return {
		restrict: 'E,A,C',
		templateUrl:'tag.html',
		replace:true,
		// transclude:true,
		scope: {
			label: '='
		},
		link:function (scope, element, attrs) {
            element.addClass('text male-tag ani fadeIn');
        }
	}
});