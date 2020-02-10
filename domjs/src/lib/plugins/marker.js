import AMap from 'AMap'

export default function(VMap) {
  VMap.prototype.marker = function(lnglat, title) {
    return new AMap.Marker({
      map: this.map,
      position: lnglat,
      title
    })
  }
  VMap.prototype.circleMarker = function(lnglat) {
    return new AMap.CircleMarker({
      map: this.map,
      center: lnglat,
      radius: 20,
      strokeColor: 'red',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      fillColor: 'red',
      fillOpacity: 0.5
    })
  }
  VMap.prototype.text = function(lnglat, text) {
    return new AMap.Text({
      map: this.map,
      position: lnglat,
      text,
      anchor: 'top-center',
      style: {
        padding: '2px 6px',
        borderRadius: '14px',
        color: '#FFF',
        backgroundColor: '#409EFF'
      }
    })
  }
}
