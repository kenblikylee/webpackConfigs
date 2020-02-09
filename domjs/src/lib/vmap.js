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
}

const r = require.context('./plugins', false, /\.js$/i)
r.keys().forEach(k => {
  r(k).default(VMap)
})

export default VMap
