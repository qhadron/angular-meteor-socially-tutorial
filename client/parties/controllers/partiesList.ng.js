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
		$scope.page = Session.get('partiesPage') || 1;
		$scope.perPage = 3;
		$scope.sort = Session.get('partiesSortMethod') || $scope.sortMethods[0];
		
		//update data
		$meteor.subscribe('users');
		$meteor.autorun($scope, function () {
			$meteor.subscribe('parties', {
				limit: ($scope.getReactively('perPage')),
				skip: (($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
				sort: $scope.getReactively('sort').val
			}, $scope.getReactively('search')).then(function () {
				$scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
			});
		});
		
		//scope methods
		$scope.parties = $meteor.collection(function () {
			return Parties.find({}, {
				sort: $scope.getReactively('sort').val
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
			$('#modal_add').closeModal();
		}

		$scope.pageChanged = function (newPage) {
			Session.set('partiesPage', newPage);
		}


		$scope.sortBy = function (method) {
			$scope.sort = method;
			Session.set('partiesSortMethod', method);
		}

		$scope.cmp = function (a, b) {
			return JSON.stringify(a) === JSON.stringify(b);
		}
	});
							