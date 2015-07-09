app.controller('PartiesListCtrl',
	function ($scope, $meteor, $rootScope) {
		$scope.parties = $meteor.collection(Parties).subscribe('parties');
		$scope.remove = function (party) {
			if (party.owner === $rootScope.currentUser._id) {
				$scope.parties.remove(party);
			}
		}
		$scope.removeAll = function () {
			$scope.parties.remove();
		}
		$scope.addParty = function () {
			$scope.newParty = $scope.newParty || {};
			$scope.newParty.owner = $rootScope.currentUser._id;
			$scope.parties.push($scope.newParty);
			$scope.newParty = '';
		}
	});
									