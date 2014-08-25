Template.comment.comments = function() {
	var poll = Polls.findOne(Router.current().params._id);

	if(poll) {
		return poll.comments;
	}
}

Template.comment.events({
	'click .submit': function(evt, tmpl) {
		evt.stopPropagation();
		evt.preventDefault();

		var pollId = Router.current().params._id;
		var name = tmpl.find('#name').value;
		var message = tmpl.find('#message').value;

		if(name == '' || message == '') {
			alert('Please input name and message field.');
			return false;
		}

		var options = {
			pollId: pollId,
			comments: {name: name, message: message}
		}

		Meteor.call('addComment', options, function(error) {
			if(error) {
				alert(error.reason)
			}
			else {
				$('#message').val('');
			}
		})
	}
})