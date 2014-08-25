Template.pollResult.poll = function() {
	return Polls.findOne(Router.current().params._id);
}

Template.pollResult.helpers({
	addOne: function(number) {
		return number + 1;
	},
	totalVote: function() {
		var poll = Polls.findOne(Router.current().params._id);
		if(poll) {
			Session.set('totalVote', poll.totalVote);
			return poll.totalVote;
		}
	},
	percentage: function(score) {
		var percentage = ((parseFloat(score) / parseFloat(Session.get('totalVote'))) * 100).toFixed(2);

		if(percentage == 'NaN') 
			return 0.00;
		else 
			return percentage;
	}
})