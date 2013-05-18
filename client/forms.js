Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.login.events({
	'click #submit_register': function(event) {
		var $form = $('#create>fieldset');
		$('#register-error').hide();
		try {
			Accounts.createUser({
				username: $form.find('input[name=team]').val(),
				email: $form.find('input[name=email]').val(),
				password: $form.find('input[name=password]').val(),
				profile: {
					from_novosib: $form.find('input[name=from_novosib]').is(':checked'),

					// for teams from Nsk
					team_size: $form.find('input[name=team_size]').val(),
					notebooks: $form.find('input[name=notebooks]').val(),

					// for other teams
					country: $form.find('input[name=country]').val(),

					// contest info
					solvedTasks: [], //< list of ids of solved tasks
					score: 0, //< score :)
					lastSuccess: 0 //< date of last successfully solved task
				}
			}, function(error) {
				if (error) {
					setRegisterError(error);
				} else {
					setRegisterSuccess();
				}
			});
		} catch(e) {
			setRegisterError(e);
		}
		return false;
	},

	'change #from_novosib': function(event) {
		if ($('#from_novosib').is(':checked')) {
			$('#team_size').css('display','block');
			$('#notebooks').css('display', 'block');
		} else {
			$('#team_size').css('display', 'none');
			$('#notebooks').css('display', 'none');
		}
	}
});

function setRegisterError(error) {
	$('#registerError').html(error.toString());
	$('#register-error').show();
}

function setRegisterSuccess() {
	$('#registerSuccess').html('You have successfully signed up.');
	$('#register-error').hide();
	$('#register-success').show();
}

Template.login.teams = function() {
	var i = 1;
    return Meteor.users.find({}).map(function(user) {
        return _.extend(user, {number: i++});
    });
};
