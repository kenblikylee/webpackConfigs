class VMap {
  constructor(map) {
    this.map = map
    this.init()
  }
  init() {
    this.map.setMapStyle('amap://styles/whitesmoke')
    this.map.setFeatures(['bg', 'point', 'road', 'building']) // ['bg', 'point', 'road', 'building']
  }
  on() {
    this.map.on(...arguments)
  }
  off() {
    this.map.off(...arguments)
  }
  fit() {
    this.map.setFitView(null, false, [0,0,0,0], 15)
  }
  clear() {
    this.map.clearMap()
    this.map.clearInfoWindow()
  }
  destroy() {
    this.map.destroy()
  }
  use(plugins, cb) {
    this.map.plugin(plugins, cb)
  }
}

const r = require.context('./plugins', false, /\.js$/i)
r.keys().forEach(k => {
  r(k).default(VMap)
})

export default VMap
