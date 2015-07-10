/// <reference path="../typings/angular-meteor/angular-meteor.d.ts"/>

Meteor.publish("parties", function (options) {
	var invitedQuery = {};
	invitedQuery['invited.' + this.userId] = true;
	var totalQuery = {
		$or: [
			{$and:[
				{ "public": true },
				{ "public": {$exists: true}}
			]},
			{$and:[
				{ owner: this.userId },
				{ owner: {$exists:true}}
			]},
			{
				$and: [
					{ "invited": { $exists: true } },
					invitedQuery
				]
			}
		]
	};
	Counts.publish(this, 'numberOfParties', Parties.find(totalQuery),{noReady:true});
	return Parties.find(totalQuery, options);
}) 