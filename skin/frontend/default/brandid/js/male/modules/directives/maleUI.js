var maleUI = angular.module('maleUI', [])

.directive('textTag', function() {
	return {
		restrict: 'E',
		templateUrl:'tag.html',
		replace:true,
		// transclude:true,
		scope: {
			label: '=',
			id: '=',
			isSelected: '=',
			clickedTag: '=clickDelegate' // this calls the parent controller's function defined in the markup
		},
		link:function (scope, element, attrs) {
            element.addClass('text ani fadeIn');
            
            // need to do stuff to the element when it is clicked
            element.on('click',function() {
            	// element.toggleClass('selected');
            	scope.isSelected = !scope.isSelected;
            	
            });
        }
	}
});