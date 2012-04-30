Template.slideshows.events = {
  'click button': function() {
    Router.newShow();
  }
}
Template.show.events = {
  'click': function() { Session.set('show_id', this._id); }
};
Template.index_slide.events = {
  'click .past': function(e) {
    //TODO find a way to stop propagation in the remove event instead
    if($(e.srcElement).hasClass('remove')) return; 
    set_current_slide(this._id);
  },
  'click .future': function(e) {
    if($(e.srcElement).hasClass('remove')) return; 
    if(Session.get('admin')) set_current_slide(this._id);
  },
  'click .remove': function() {
    remove_slide(this._id);
  }
};
Template.slide_list.events = {
  'click #presentation-mode': function() { presentationMode(true);},
  'click #new-slide':  function() { insert_slide(); },
  'click #remove-show':  function() { 
    if(confirm('Are you sure? This cannot be undone.')) {
      removeShow();
    }
  },
  'click .first': function() {
    unset_current_slide();
  }
};

