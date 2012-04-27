function update(selector, updates, multi) {
  if(!Session.get('passcode')) return;
  multi = multi || false;
  Meteor.call('update', selector, updates, multi, Session.get('passcode'));
}
function insert(attributes) {
  if(!Session.get('passcode')) return;
  Meteor.call('insert', attributes, Session.get('passcode'));
}
function remove(selector) {
  if(!Session.get('passcode')) return;
  Meteor.call('remove', selector, Session.get('passcode'));
}

function current_slide() {
  return Slides.findOne({ current: true }) || Slides.findOne({}, {sort: {order: 1}});
}

function insert_slide() {
  var current = current_slide(); 
  if(current) {
    update({order : {$gt: current.order}}, {$inc: {order: 1}}, {multi: true});
    update(current._id, {$set: {current: false}});
    insert({ title: "New Slides"+current.order, body: "Edit me!", order: current.order+1, current: true });
  } else {
    insert({ title: "New Slides", body: "Edit me!", order: Slides.find().count() });
  }
}

function move_prev(id) {
  var s = Slides.findOne({_id: id});
  if(!s) return;
  var p = Slides.findOne({ order: { $lt: s.order } }, { sort: { order: -1 } });
  if(!p) return;

  update({_id: s._id}, { $set: { order: p.order } });
  update({_id: p._id}, { $set: { order: s.order } });
}

function move_next(id) {
  var s = Slides.findOne({_id: id});
  if(!s) return;
  var n = Slides.findOne({order: { $gt: s.order } }, { sort: { order: 1 } });
  if(!n) return;

  update({_id: s._id}, { $set: { order: n.order } });
  update({_id: n._id}, { $set: { order: s.order } });
}

function remove_slide(id) {
  if(Slides.find().count() === 1) return; //Just edit the thang
  if(Session.equals('current', id)) {
    set_current_slide(Slides.findOne({current: false}, {sort: {order: 1}})._id);
  }
  var slide = Slides.findOne(id);
  update({order : {$gt: slide.order}}, {$inc: {order: -1}}, {multi: true});
  remove({ _id: id });
}
