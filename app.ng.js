/* global Parties */
/// <reference path="typings/angular-meteor/angular-meteor.d.ts"/>

/** Collections */
Parties = new Mongo.Collection("parties");

/** Angluar */
if (Meteor.isClient) {
	var app = angular.module('socially',['angular-meteor']);
	
	app.controller('PartiesListCtrl',
		function($scope,$meteor) {
			$scope.parties = $meteor.collection(Parties);
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