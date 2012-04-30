Template.current_slide.events = {
  'dblclick #slide-title': function(e) {
    if(!Session.get('admin')) return;
    $('#slide-title').attr('contentEditable', true).focus();
  },
  'blur #slide-title': function() {
    $('#slide-title').attr('contentEditable', null);
    $('#slide-title').text(this.title);
  }, 
  'keydown #slide-title': function(e) {
    e.stopPropagation();
    if(e.keyCode === 13) {
      e.preventDefault();
      var new_title = $('#slide-title').text().replace(/(^\s+|\s+$)/g,'');
      if(new_title.length > 3 && Session.get('admin')) {
        if(this.show_id) {
          update(this._id, {$set : {title: new_title}});
        } else {
          updateShow({$set: {title: new_title}});
        }
      } else {
        $('#slide-title').text(this.title);
      }
      $('#slide-title').blur();
    } 
  },
  'click #cancel-button': function() {
    Session.set('editingBody', false);
  },
  'click #save-button': function() {
    Session.set('editingBody', false);
    //TODO client current is not enough!!
    var new_body = $('#body-box').val();
    if(!_.isEqual(this.body, new_body)) {
      if(this.show_id) {
        update(this._id, {$set: {body: new_body}});
      } else {
        updateShow({$set: {body: new_body}});
      }
    }
  },
  'click #edit-button': function() {
    if(!Session.get('admin')) return;
    Session.set('editingBody', true);
    Meteor.flush();
    $('#slide-body textarea').focus();
  },
};
