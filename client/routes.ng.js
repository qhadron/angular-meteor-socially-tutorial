app.config(
	function ($urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('parties', {
				url: '/parties',
				templateUrl: 'client/parties/views/parties-list.ng.html',
				controller: 'PartiesListCtrl'
			})
			.state('partyDetails', {
				url: '/parties/:partyId',
				templateUrl: 'client/parties/views/party-details.ng.html',
				controller: 'PartyDetailsCtrl',
				resolve: {
					"currentUser": function ($meteor,$stateParams) {
						return $meteor.requireValidUser(function (user) {
							return Parties.findOne({ _id: $stateParams.partyId }).owner === user._id;
						});
					}
				}
			});
		$urlRouterProvider.otherwise('/parties');
	});

app.run(
	function ($rootScope, $state) {
		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
				$state.go("parties");
			}
		})
	})