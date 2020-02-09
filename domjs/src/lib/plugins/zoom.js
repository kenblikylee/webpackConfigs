export default function install(VMap) {
  VMap.prototype.setZoom = function(l) {
    this.map.setZoom(l)
  }
  VMap.prototype.setZoomAndCenter =  function(...args) {
    this.map.setZoomAndCenter(...args)
  }
}
