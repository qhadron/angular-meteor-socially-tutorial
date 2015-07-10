/// <reference path="../typings/angular-meteor/angular-meteor.d.ts"/>

Meteor.publish("parties", function (options, searchString) {
	if (!searchString) {
		searchString = '';
	}
	var invitedQuery = {};
	invitedQuery['invited.' + this.userId] = true;
	var totalQuery = {
		'name' : { '$regex' : searchString || '' + '.*', '$options' : 'i'},
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
	console.log(totalQuery);
	Counts.publish(this, 'numberOfParties', Parties.find(totalQuery),{noReady:true});
	return Parties.find(totalQuery, options);
}) 