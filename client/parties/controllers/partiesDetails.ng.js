app.controller('PartyDetailsCtrl',
	function ($scope, $stateParams, $meteor, $timeout, $rootScope) {
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
		$scope.invite = function (user, add) {
			if (typeof add === "undefined")
				add = true;
			$meteor.call('invite', $scope.party._id, user._id, add);
		}
		$scope.owner = getUser($scope.party.owner);
		$scope.isOwner = $scope.party.owner == $rootScope.currentUser._id;
		$scope.$watch('party.invited', function () {
			$scope.invitedUsers = Object.keys($scope.party.invited)
				.filter(function (key) {
					return $scope.party.invited[key];
				}).map(function (val, i, arr) {
					return getUser(val);
				});
		});
	});

