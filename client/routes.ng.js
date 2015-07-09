/* global app */
app.config(
	function ($urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('parties', {
				url: '/parties',
				templateUrl: 'client/parties/views/parties-list.ng.html',
				controller: 'PartiesListCtrl',
			})
			.state('partyDetails', {
				url: '/parties/:partyId',
				templateUrl: 'client/parties/views/parties-details.ng.html',
				controller: 'PartyDetailsCtrl',
				resolve: {
					"currentUser": function ($meteor, $stateParams) {
						return $meteor.requireUser();
					},
					"validParty": function ($meteor, $stateParams, $q) {
						var party = Parties.findOne({ _id: $stateParams.partyId });
						if (!party) {
							throw "INVALID_REQUEST";
						}
						return party;
					}
				},
			});
		$urlRouterProvider.otherwise('/parties');
	});

app.run(
	function ($rootScope, $state) {
		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
				$state.go("parties");
			} else if (error === "INVALID_REQUEST") {
				$state.go("parties");
			}
		});
	})