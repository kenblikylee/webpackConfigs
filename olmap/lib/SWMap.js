function SWMap(mapAdapter) {
  this.map = mapAdapter
}

const r = require.context("./fns", false, /\.js$/i);
r.keys().forEach((k) => {
  r(k).default(SWMap.prototype)
});

export default SWMap
