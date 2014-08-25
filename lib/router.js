Router.configure({
	layoutTemplate: 'layout',
	yieldTemplates: {
		'header': {to: 'header'},
		'footer': {to: 'footer'}
	}
});

Router.map(function() {

	this.route('pollResult', {
		path: '/:_id/result'
	});

	this.route('pollVoting', {
		path: '/:_id'
	});

	this.route('poll', {
		path: '/'
	});
});