app.filter('uninvited', function () {
	return function (users, party) {
		if (!party)
			return false;
		var res = _.filter(users, function (user) {
			if (user._id == party.owner)
				return false;
			if (party.invited[user._id])
				return false;
			return true;
		});
		return res;
	}
})