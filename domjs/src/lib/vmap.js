import AMap from 'AMap';

class VMap {
  constructor(map) {
    this.map = map;
  }
  on() {
    this.map.on(...arguments);
  }
  off() {
    this.map.off(...arguments);
  }
  fit() {
    this.map.setFitView(null, false, [0, 0, 0, 0], 15);
  }
  clear() {
    this.map.clearMap();
    this.map.clearInfoWindow();
  }
  destroy() {
    this.map.destroy();
  }
  add() {
    this.map.add(...arguments);
  }
  setLayers(layers) {
    this.map.setLayers(layers);
  }
  setCenter(center) {
    this.map.setCenter(center);
  }
}

let loadedPlugins = [];

VMap.use = plugins => {
  return new Promise(resolve => {
    if (typeof plugins === 'string') {
      if (loadedPlugins.includes(plugins)) {
        resolve();
        return;
      }
    } else if (Array.isArray(plugins)) {
      plugins = plugins.filter(plugin => !loadedPlugins.includes(plugin));
      if (!plugins.length) {
        resolve();
        return;
      }
    } else {
      resolve();
      return;
    }
    AMap.plugin(plugins, () => {
      loadedPlugins = loadedPlugins.concat(plugins);
      resolve();
    });
  });
};

VMap.AMap = AMap;

const r = require.context('./plugins', false, /\.js$/i);
r.keys().forEach(k => {
  r(k).default(VMap);
});

export default VMap;
