Polls = new Meteor.Collection('polls');

Polls.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return false;
	},
	remove: function() {
		return false;
	}
});

Meteor.methods({
	addVote: function(poll) {
		var isVoted = Polls.findOne({_id: poll.pollId, ip: poll.ip});
		var allowMultipleChoices = Polls.findOne({_id: poll.pollId});

		if(isVoted) {
			alert('Could not cast your vote. You have already voted on this poll.');
			return false;
		}

		Polls.update({_id: poll.pollId}, {$addToSet: _.pick(poll, 'ip'), $inc: _.omit(poll, 'pollId', 'optionId', 'ip')}, function(error) {
			if(error) {
				console.log(error.reason);
			}
		});
	},
	addComment: function(option) {
		Polls.update({_id: option.pollId}, {$push: _.omit(option, 'pollId')}, function(error) {
			if(error) {
				console.log(error.reason);
			}
		});
	}
})