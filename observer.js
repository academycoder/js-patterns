var publisher = {

  subscribers: {
    any: []
  },

  subscribe: function (fn, type) {
    type = type || 'any';

    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
  },

  unsubscribe: function (fn, type) {
    this.visitSubscribes('unsubscribe', fn, type);
  },

  publish: function (publication, type) {
    this.visitSubscribes('publish', publication, type);
  },

  visitSubscribes: function (action, arg, type) {
    var pubtype = type || 'any',
        subscribers = this.subscribers[pubtype],
        i,
        max = subscribers.length;

    for (i = 0; i < max; i++) {
      if (action === 'publish') {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};

function makePublisher(o) {
  var i;

  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publisher[i];
    }
  }

  o.subscribers = {any: []};
}