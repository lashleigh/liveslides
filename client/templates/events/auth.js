Template.auth.events = {
  'click #auth_submit': function() {
    var secret = $('#auth_input').val();
    set_admin(secret);
  },
  'click #ok': function() {
    set_admin(Session.get('passcode'));
  }
}
