
Template.registerHelper('formatDateRelative', function(date) {
  return moment(date).fromNow();
});
