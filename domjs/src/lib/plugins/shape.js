import AMap from 'AMap'

export default function(VMap) {
  VMap.prototype.polyline = function(path) {
    return new AMap.Polyline({
      map: this.map,
      zIndex: 50,
      path,
      strokeColor: '#E3604E',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      strokeStyle: 'solid'
    })
  }

  VMap.prototype.polygon = function(path) {
    return new AMap.Polygon({
      map: this.map,
      zIndex: 50,
      path,
      strokeColor: '#E3604E',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      strokeStyle: 'solid',
      fillColor: '#E3604E',
      fillOpacity: 0.23
    })
  }

  VMap.prototype.bezierCurve = function(path) {
    return new AMap.BezierCurve({
      map: this.map,
      zIndex: 50,
      path,
      strokeColor: '#E3604E',
      strokeOpacity: 0.9,
      strokeWeight: 8,
      strokeStyle: 'solid',
      showDir: true
    })
  }

  VMap.prototype.circle = function(center, radius) {
    return new AMap.Circle({
      map: this.map,
      zIndex: 50,
      center,
      radius,
      strokeColor: '#E3604E',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      strokeStyle: 'solid',
      fillColor: '#E3604E',
      fillOpacity: 0.23
    })
  }

  VMap.prototype.ellipse = function(center, radius) {
    return new AMap.Ellipse({
      map: this.map,
      zIndex: 50,
      center,
      radius,
      strokeColor: '#E3604E',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      strokeStyle: 'solid',
      fillColor: '#E3604E',
      fillOpacity: 0.23
    })
  }

  VMap.prototype.rectangle = function(southWest, northEast) {
    return new AMap.Rectangle({
      map: this.map,
      zIndex: 50,
      bounds: AMap.Bounds(southWest, northEast),
      strokeColor: '#E3604E',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      strokeStyle: 'solid',
      fillColor: '#E3604E',
      fillOpacity: 0.23
    })
  }

  VMap.prototype.groundImage = function(url, southWest, northEast) {
    return new AMap.GroundImage(url, AMap.Bounds(southWest, northEast), {
      map: this.map,
      clickable: false,
      opacity: 1
    })
  }
}