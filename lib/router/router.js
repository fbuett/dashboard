Router.configure({
  layoutTemplate: 'home',
  loadingTemplate: 'loading',
  waitOn: function () { 
  	return Meteor.subscribe("sensors");
  }
});

Router.route('/', function () {
	this.redirect(('/dashboard'))
});

Router.route('/dashboard', function () {
	this.render('overview', {to: 'main'})
})
Router.route('/data', function () {
    this.render('sensortable', {to: 'main'})
});

Router.route('/charts', function () {
    this.render('sensorchart', {to: 'main'})
});

Router.route('/devices', function () {
    this.render('devices', {to: 'main'})
});