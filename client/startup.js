////////// Tracking selected list in URL //////////

var ShowsRouter = Backbone.Router.extend({
  routes: {
    "": "shows",
    "shows": "shows",
    "shows/new": "newShow",
    "shows/:show_id": "main",
    "shows/:show_id/secret": "secret",
    "shows/:show_id/secret=:secret": "secret_url"
  },
  secret: function(show_id) {
    Session.set("show_id", show_id);
    Session.set('auth_page', true);
    this.navigate('shows/'+show_id+'/secret');
  },
  secret_url: function(show_id, secret) {
    Session.set("show_id", show_id);
    Session.set('auth_page', false);
    Session.set('passcode', secret);
    set_admin(secret);
  },
  main: function (show_id) {
    Session.set("show_id", show_id);
  },
  shows: function() {
    Session.set('show_id', null);
    Session.set('current', null);
    Session.set('client_current', null);
    this.navigate('shows');
  },
  newShow: function() {
    var that = this;
    Meteor.call('generateSecret', function(error, secretCode) {
      if(secretCode) {
        Meteor.call('newShow', secretCode, function(error, show_id) {
          Session.set("show_id", show_id);
          Session.set('passcode', secretCode);
          Session.set('auth_page', true);
          that.navigate('shows/'+show_id+'/secret='+secretCode, {replace: true});
        });
      }
    })
  },
  setShow: function (show_id) {
    if(Session.get('auth_page')) return;
    this.navigate('shows/'+show_id);
  }
});

Router = new ShowsRouter;

Meteor.startup(function() {
  Backbone.history.start({pushState: true});
});

