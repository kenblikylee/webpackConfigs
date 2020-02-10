const _events = {}

export default function(VMap) {
  VMap.prototype.$emit = (event, payload) => {
    if (_events[event]) {
      _events[event].handlers.forEach(handler => handler(payload))
    }
  }

  VMap.prototype.$on = (event, handler) => {
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
}
