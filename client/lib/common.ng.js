/* global getUser */
getUser = function (userId) {
	return Meteor.users.findOne({ _id: userId });
}