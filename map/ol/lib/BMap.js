function BMap(mapAdapter) {
  this.map = mapAdapter
}

const r = require.context("./fns", false, /\.js$/i);
r.keys().forEach((k) => {
  r(k).default(BMap.prototype)
});

export default BMap
