export default fn => {
  fn.marker = function marker(data, transform) {
    if (typeof data !== 'object') {
      throw new Error('数据必须是对象或者数组')
    }
    data = transform(data)
    console.log('marker', data)
  }
}