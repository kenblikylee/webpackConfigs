import AMap from 'AMap'
import Loca from 'Loca'

const icon = {
  type: 'image',
  image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
  size: [6, 9],
  anchor: 'bottom-center',
  angel: 0,
  retina: true
}

const createLabelMarker = function(label) {
  let { position, text } = label
  return new AMap.LabelMarker({
    position,
    zooms: [3, 20],
    opacity: 0.8,
    rank: 1,
    icon: {
      type: 'image',
      image: 'static/poi-marker.png',
      clipOrigin: [194+174.8*3, 92-87.3],
      clipSize: [50, 68],
      size: [25, 34],
      anchor: 'bottom-center', // 'top-left'| 'top-center'| 'top-right'| 'middle-left'| 'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right'
      angel: 0,
      retina: true
    },
    text: {
      content: text,
      direction: 'top', // 相对于图标的方位: top' 'right' 'bottom' 'left' 'center'
      style: {
        fontSize: 12,
        fontWeight: 'normal',
        fillColor: '#fff',
        strokeColor: '#fff',
        strokeWidth: 0,
        borderRadius: '6px',
        backgroundColor: '#E3604E'
      }
    }
  })
}

export default function(VMap) {
  VMap.prototype.labelsLayer = function(labels, isShort = true) {
    let layer = new AMap.LabelsLayer({
      zooms: [3, 20],
      zIndex: 100,
      opacity: 0.9,
      collision: true,
      animation: true
    })
    let markers
    if (isShort) {
      markers = labels.map(label => createLabelMarker(label))
    } else {
      markers = labels.map(label => new AMap.LabelMarker(label))
    }
    layer.add(markers)
    this.map.add(layer)
    return layer
  }

  VMap.prototype.polygonLayer = function(polygons) {
    let layer = new Loca.PolygonLayer({
      map: this.map
    })
    layer.setData(polygons, {
      lnglat: 'lnglat'
    })
    layer.setOptions({
      style: {
        opacity: 1,
        border: '3px',
        borderColor: '#E3604E',
        color: function (res) {
          // let { index, value } = res
          return 'rgba(227,96,78,0.23)'
        }
      }
    })
    layer.render()
    return layer
  }
}
