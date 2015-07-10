/// <reference path="../typings/angular-meteor/angular-meteor.d.ts"/>
Meteor.publish("parties", function () {
	var invitedQuery = {};
	invitedQuery['invited.' + this.userId] = true;
	return Parties.find({
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
	});
}) 