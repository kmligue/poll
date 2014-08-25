Template.pollVoting.poll = function() {
	return Polls.findOne(Router.current().params._id);
};

Template.pollVoting.events({
	'click .option span': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();

		var checkbox= $(evt.target).parent().find('input');

		if(checkbox[0].type == 'radio') {
			$('.poll-options .option span').removeClass('checked');
		}

		if(checkbox.is(':checked') && checkbox[0].type == 'radio') {
			checkbox.prop('checked', false);
			$(evt.target).removeClass('checked');
		}
		else if(!checkbox.is(':checked') && checkbox[0].type == 'radio') {
			checkbox.prop('checked', true);
			$(evt.target).addClass('checked');
		}

		if(checkbox.is(':checked') && checkbox[0].type == 'checkbox') {
			checkbox.prop('checked', false);
			$(evt.target).removeClass('checked');
		}
		else if(!checkbox.is(':checked') && checkbox[0].type == 'checkbox') {
			checkbox.prop('checked', true);
			$(evt.target).addClass('checked');
		}

	},
	'click .vote': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();

		var options = {};
		var pollId = Router.current().params._id;
		var optionId = 0;
		var ip = headers.get('x-ip-chain');
		var totalVote = 0;

		$('input:checked').each(function() {

			if($(this).is(':checked')) {
				optionId = $(this).val();
				totalVote += 1;
				options['options.' + optionId + '.score'] = 1;
			}
		});

		if(totalVote == 0) {
			alert('Please pick at least one.');
			return false;
		}

		options['pollId'] = pollId;
		options['ip'] = [ip];
		options['totalVote'] = totalVote;

		Meteor.call('addVote', options, function(error) {
			if(error) {
				console.log(error.reason);
			}
			else {
				Router.go('/' + Router.current().params._id + '/result');
			}
		})
	},
	'click .result': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		Router.go('/' + Router.current().params._id + '/result');
	}
});