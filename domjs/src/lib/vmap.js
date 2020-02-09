class VMap {
  constructor(map) {
    this.map = map
    this.init()
  }
  init() {
    this.map.setMapStyle('amap://styles/whitesmoke')
    this.map.setFeatures(['bg', 'point', 'road', 'building']) // ['bg', 'point', 'road', 'building']
  }
}

function installAll (r) {
  r.keys().forEach(key => {
    let plugin = r(key)
    plugin.default(VMap)
  })
}

installAll(require.context('./plugins', false, /\.js$/i))

export default VMap
