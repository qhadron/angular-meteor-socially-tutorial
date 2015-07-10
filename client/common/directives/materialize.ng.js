///directive for populating materialize dropdown menues
app.directive('mDropdown', function ($timeout) {
	return {
		restrict: 'A',
		controller: function () {
			console.log("dropdown task added....");
			//load jquery after rendering has finished
			$timeout(function () {
				$('.dropdown-button').dropdown({
					inDuration: 300,
					outDuration: 225,
					constrain_width: false, // Does not change width of dropdown to that of the activator
					hover: false, // Activate on hover
					gutter: 0, // Spacing from edge
					belowOrigin: true // Displays dropdown below the button
				})
			});
		}
	};
});