app.controller('PartyDetailsCtrl',
	function ($scope, $stateParams, $meteor) {
		$scope.party = $meteor.object(Parties, $stateParams.partyId, false).subscribe('parties');
		$scope.partyId = $stateParams.partyId;
		$scope.save = function () {
			$scope.party.save();
		};
		$scope.reset = function () {
			$scope.party.reset();
		}
		$scope.clear = function () {
			$scope.party.name = "";
			$scope.party.description = "";
		}
		$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
		$scope.popDropdown = function () {
			$('.dropdown-button').dropdown({
				inDuration: 300,
				outDuration: 225,
				constrain_width: false, // Does not change width of dropdown to that of the activator
				hover: false, // Activate on hover
				gutter: 0, // Spacing from edge
				belowOrigin: true // Displays dropdown below the button
			});
		}
	});

