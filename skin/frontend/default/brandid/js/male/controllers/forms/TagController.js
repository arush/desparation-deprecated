
var TagController = function TagController($scope,HelperService,brandsLoader,$routeParams,brandsLoader,$locale) {
	$scope.typeahead = {
			typeaheadValue: ""
		};


	$scope.selectedTags = [
		{
			id: "Ralph Lauren",
			isSelected:true,
			text: "Ralph Lauren"
		},
		{
			id: "French Connection",
			isSelected:true,
			text: "French Connection"
		},
		{
			id: "Paul Smith",
			isSelected:true,
			text: "Paul Smith"
		},
		{
			id: "Ted Baker",
			isSelected:true,
			text: "Ted Baker"
		}
	];

	/***** TYPEAHEAD ******/

	$scope.toggleTag = function(senderId) {
		// alert('called');
		console.log(senderId);

		var found = false;

		// search for and remove it
		for(var i = 0; i < $scope.selectedTags.length; i++){
			if($scope.selectedTags[i].id === senderId) {
				
				console.log('found');
				found = true;
				
				$scope.selectedTags.splice(i,1);
					
				break;
			}

		}

		// add it if it wasn't there already
		if(!found) {
			console.log('not found');
			var tagToAdd = {
				id: senderId,
				isSelected:true,
				text: senderId
			}
			// TODO: add element model instead of fakie
			$scope.selectedTags.unshift(tagToAdd);

		}
		// search selected brands, if exists, add, if not, remove

	}

		$scope.typeahead.allBrands = ['thing','thing2'];

		$scope.addTag = function() {
	      if($scope.typeahead.typeaheadValue !== "") {
	      	var tagToAdd = {
	      		id: $scope.typeahead.typeaheadValue,
	      		isSelected:true,
	      		text: $scope.typeahead.typeaheadValue
	      	};

	      	$scope.selectedTags.unshift(tagToAdd);
	      	$scope.typeahead.typeaheadValue = "";

	      }
	      
	    };

}
TagController.$inject = ['$scope','HelperService','brandsLoader','$routeParams','brandsLoader','$locale'];
