export default function(VMap) {
  VMap.prototype.setZoom = function(l) {
    this.map.setZoom(l)
  }
  VMap.prototype.setZoomAndCenter =  function(...args) {
    this.map.setZoomAndCenter(...args)
  }
}
