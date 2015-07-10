app.controller('PartiesListCtrl',
	function ($scope, $meteor, $rootScope, $timeout) {
		//definitions
		$scope.getUser = getUser;
		$scope.sortMethods = [
			{
				display: "Name : A-Z",
				val: { name: 1 }
			},
			{
				display: "Name : Z-A",
				val: { name: -1 }
			},
			{
				display: "Public first",
				val: { 'public': -1 }
			},
			{
				display: "Private first",
				val: { 'public': 1 }
			}
		];
		$scope.page = 1;
		$scope.perPage = 3;
		$scope.sort = $scope.sortMethods[0].val;
		
		//update data
		$meteor.subscribe('users');
		$meteor.autorun($scope, function () {
			console.log("Data changed....");
			$meteor.subscribe('parties', {
				limit: ($scope.getReactively('perPage')),
				skip: (($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}).then(function () {
				$scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
				console.log(Parties.find({}, { sort: $scope.sort }).fetch());
			});
		});
		
		//scope methods
		$scope.parties = $meteor.collection(function () {
			console.log("Data sorted...");
			return Parties.find({}, {
				sort: $scope.getReactively('sort')
			});
		});

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
			$scope.newParty.invited = {};
			$scope.parties.push($scope.newParty);
			$scope.newParty = '';
		}

		$scope.pageChanged = function (newPage) {
			$scope.page = newPage;
		}


		$scope.sortBy = function (method) {
			$scope.sort = method;
		}
	});
							