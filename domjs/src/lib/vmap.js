class VMap {
  constructor(map) {
    this.map = map
    this._plugins = []
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
  add() {
    this.map.add(...arguments)
  }
  setLayers(layers) {
    this.map.setLayers(layers)
  }
  use(plugins) {
    let loadedPlugins = this._plugins
    return new Promise(resolve => {
      if (typeof plugins === 'string') {
        if (loadedPlugins.includes(plugins)) {
          resolve()
          return
        }
      } else if (Array.isArray(plugins)) {
        plugins = plugins.filter(plugin => !loadedPlugins.includes(plugin))
        if (!plugins.length) {
          resolve()
          return
        }
      } else {
        resolve()
        return
      }
      this.map.plugin(plugins, () => {
        this._plugins.concat(plugins)
        resolve()
      })
    })
  }
  setCenter(center) {ˆ
    this.map.setCenter(center)
  }
}

const r = require.context('./plugins', false, /\.js$/i)
r.keys().forEach(k => {
  r(k).default(VMap)
})

export default VMap
