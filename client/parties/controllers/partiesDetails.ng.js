app.controller('PartyDetailsCtrl',
	function ($scope, $stateParams, $meteor, $timeout) {
		$scope.$meteorSubscribe('parties');
		$scope.party = $meteor.object(Parties, $stateParams.partyId, false)
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
		$scope.invite = function (user) {
			$scope.party.invited = $scope.party.invited || {};
			$scope.party.invited[user._id] = !$scope.party.invited[user._id];
			$scope.party.save();
		}
		$scope.owner = getUser($scope.party.owner);
		
		$scope.$watch('party.invited', function () {
			$scope.invitedUsers = Object.keys($scope.party.invited)
				.filter(function (key) {
					return $scope.party.invited[key];
				}).map(function (val, i, arr) {
					return getUser(val);
				});
		});
	});

