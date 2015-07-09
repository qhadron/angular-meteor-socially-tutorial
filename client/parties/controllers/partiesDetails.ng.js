app.controller('PartyDetailsCtrl',
	function ($scope, $stateParams, $meteor) {
		$scope.party = $meteor.object(Parties, $stateParams.partyId, false);
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
	});

