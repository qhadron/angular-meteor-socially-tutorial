/* global Parties */
/// <reference path="typings/angular-meteor/angular-meteor.d.ts"/>

/** Collections */
var Parties = new Mongo.Collection("parties");

/** Angluar */
if (Meteor.isClient) {
	var app = angular.module('socially',['angular-meteor','ui.router']);
	
	app.config(
		function($urlRouterProvider,$stateProvider,$locationProvider) {
			$locationProvider.html5Mode(true);
			
			$stateProvider
				.state('parties', {
					url: '/parties',
					templateUrl: 'parties-list.ng.html',
					controller: 'PartiesListCtrl'
				})
				.state('partyDetails', {
					url: '/parties/:partyId',
					templateUrl: 'party-details.ng.html',
					controller: 'PartyDetailsCtrl'
				});
			$urlRouterProvider.otherwise('/parties');
	});
	
	app.controller('PartiesListCtrl',
		function($scope,$meteor) {
			$scope.parties = $meteor.collection(Parties);
			$scope.remove = function(party) {
				$scope.parties.remove(party);
			}
			$scope.removeAll = function() {
				$scope.parties.remove();
			}
		});
		
	app.controller('PartyDetailsCtrl',
		function($scope, $stateParams) {
			$scope.partyId=$stateParams.partyId;
		});
}

/** Server */
if (Meteor.isServer) {
	Meteor.startup(function() {
		if (Parties.find().count()==0) {
			var parties = [
		        {'name': 'Dubstep-Free Zone',
		          'description': 'Can we please just for an evening not listen to dubstep.'},
		        {'name': 'All dubstep all the time',
		          'description': 'Get it on!'},
		        {'name': 'Savage lounging',
		          'description': 'Leisure suit required. And only fiercest manners.'}
		   	];
			
			for (var i = 0; i < parties.length; ++i) {
				Parties.insert(parties[i]);
			}
			
			console.info("Inserted values into empty database");
		}
	})
}