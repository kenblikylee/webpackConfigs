export default fn => {
  fn.marker = function marker(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.marker(data)
  }
  fn.polyline = function polyline(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.polyline(data)
  }
  fn.polygon = function polygon(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.polygon(data)
  }
  fn.circle = function circle(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.circle(data)
  }
  fn.text = function text(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.text(data)
  }
  fn.layer = function layer(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.layer(data)
  }
  fn.heat = function heat(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    if (typeof transform === 'function') {
      data = transform(data)
    }
    return this.map.heat(data)
  }
  fn.$on = function(...args) {
    this.map.$on(...args)
  }
  fn.$emit = function(...args) {
    this.map.$emit(...args)
  }
  fn.$off = function(...args) {
    this.map.$off(...args)
  }
  fn.show = function() {
    this.map.show()
  }
  fn.hide = function() {
    this.map.hide()
  }
}
