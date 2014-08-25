Template.poll.rendered = function() {
	Session.set('counter', 4);
}

Template.poll.events({
	'click .create-poll': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();

		var pollQuestion = tmpl.find('.poll-question').value;
		var options = [];
		var allowMultipleChoices = false;
		var checkboxCounter = 0;

		$('input[name="option"]').each(function() {
			if($(this).val()) {
				options.push({id: checkboxCounter, label: $(this).val(), score: 0});
				checkboxCounter += 1;
			}
		})

		if(checkboxCounter < 2 || !pollQuestion) {
			alert('Please choose a title and at least two option.');
			return false;
		}

		if($('#multiple-choices').is(':checked')) {
			allowMultipleChoices = true;
		}

		var polls = {
			question: pollQuestion,
			options: options,
			allowMultipleChoices: allowMultipleChoices,
			totalVote: 0
		};

		Polls.insert(polls, function(error, result) {
			if(error) {
				alert(error.reason)
			}
			else {
				Router.go('/' + result);
			}
		})
	},
	'keyup .last': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();
		$('div.x').removeClass('last');
		var counter = parseInt(Session.get('counter')) + 1;
		Session.set('counter', counter);

		$('.x').last().append('<div class="x last">' +
			'<label class="col-md-1">'+ counter +'.</label>' +
			'<div class="col-md-offset-1">' +
				'<input type="text" class="form-control option-4" name="option" placeholder="option here">' +
			'</div>' +
		'</div>');
	}
});