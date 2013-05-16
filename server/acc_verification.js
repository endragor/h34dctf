Accounts.validateNewUser(function(user) {
	if (!user.profile) {
		throw new Meteor.Error(403, 'Profile required');
	}

	var username = user.username;
	if (!username || typeof(username) !== 'string' || username.length < 0 || username === 'h34dump') {
		throw new Meteor.Error(403, 'Bad username');
	}

	if (!user.emails || user.emails.length < 1 || !user.emails[0].address) {
		throw new Meteor.Error(403, 'Email required');
	}

	var email = user.emails[0].address;
	var emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRe.test(email)) {
		throw new Meteor.Error(403, 'Bad email');
	}

	var fromNovosib = user.profile.from_novosib;
	if (typeof(fromNovosib) !== 'boolean') {
		throw new Meteor.Error(403, 'Bad checkbox value');
	}

	if (fromNovosib) {
		if (user.profile.team_size === null || isNaN(user.profile.team_size) || parseInt(user.profile.team_size, 10) < 1) {
			throw new Meteor.Error(403, 'Bad team size');
		}

		if (user.profile.notebooks === null || isNaN(user.profile.notebooks) || parseInt(user.profile.notebooks, 10) < 0) {
			throw new Meteor.Error(403, 'Bad notebooks amount');
		}
	}

	return true;
});