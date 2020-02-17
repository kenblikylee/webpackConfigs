const _events = {}

/* eslint-disable-next-line */
export default (map, L, api) => {
  map.on('click', function(ev) {
    api.$emit('click', ev.latlng)
  });

  api.$emit =  (event, payload) => {
    if (_events[event]) {
      _events[event].handlers.forEach(handler => handler(payload))
    }
  }

  api.$on =  (event, handler) => {
    if (_events[event]) {
      _events[event].handlers.push(handler)
    } else {
      _events[event] = {
        handlers: [
          handler
        ]
      }
    }
  }
};
