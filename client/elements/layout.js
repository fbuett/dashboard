Template.home.events({
	'click .navbar-collapse.in': function (e) {
	    if( $(e.target).is('a') ) {
	        $('.navbar-collapse').collapse('hide');
    	}
	}
})

Template.home.helpers ({
	/*
	  get current Meteor release version
	*/
	'mRelease': function () {
	  return Meteor.release;   
	}
});