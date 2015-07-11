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
	Counts.publish(this, 'numberOfParties', Parties.find(totalQuery),{noReady:true});
	return Parties.find(totalQuery, options);
}) 

Meteor.methods({
	invite: function (partyId, userId, add) {
		check(partyId, String);
		check(userId, String);
		var party = Parties.findOne(partyId);
		if (!party)
			throw new Meteor.Error(404, "No such party");
		if (party.owner !== this.userId)
			throw new Meteor.Error(404, "No such party");
		if (party.public) {
			throw new Meteor.Error(400, "This party is public. No need to invite people.")
		}
		if (userId !== party.owner) {
			var setModifier = {};
			setModifier['invited.' + userId] = !!add;
			Parties.update(partyId, { $set: setModifier })
			
			if (add && Meteor.isServer) {
				var from = contactEmail(Meteor.users.findOne(this.userId));
				var to = contactEmail(Meteor.users.findOne(userId));
				Email.send({
					from: "noreply@socially.com",
					to: to,
					replyTo: from || undefined,
					subject: "PARTY: " + party.name,
					text:
					"Hey, I just invited you to '" + party.name + "' on Socially." +
					"\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
				});
			}
		}	
	}
})

var contactEmail = function (user) {
    if (user.emails && user.emails.length)
      return user.emails[0].address;
    if (user.services && user.services.facebook && user.services.facebook.email)
      return user.services.facebook.email;
    return null;
 };