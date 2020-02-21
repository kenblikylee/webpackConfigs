import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Icon, Text, Fill } from 'ol/style';

let fill = new Fill({ color: '#ffffff' })
let backgroundFill = new Fill({ color: '#2F6EF8' })

const createMarkerLayer = data => {
  let styleDef = {
    offsetY: -50,
    scale: 1
  }
  let iconFeatures = data.reduce((last, item) => {
    let style = Object.assign(styleDef, item.style || {})
    let feature = new Feature({
      data: item,
      geometry: new Point(item.lnglat)
    })
    let styles = [new Style({
      image: new Icon({
        scale: style.scale,
        src: item.icon || 'static/icons/marker.png'
      })})]
    if (!style.noText && item.name) {
      styles.push(new Style({
        text: new Text({
          font: style.font || '12px PingFangSC-Medium,PingFang SC',
          fill: style.fill ? new Fill({ color: style.fill }) : '',
          backgroundFill: style.backgroundFill ? new Fill({ color: style.backgroundFill }) : '',
          padding: [5, 10, 5, 10],
          text: item.name,
          offsetY: style.offsetY
        })
      }))
    }
    if (item.value) {
      styles.push(new Style({
        text: new Text({
          font: style.font || '12px PingFangSC-Medium,PingFang SC',
          fill: fill,
          backgroundFill: backgroundFill,
          padding: [5, 10, 5, 10],
          text: item.value + '',
          offsetY: -23
        })
      }))
    }
    feature.setStyle(styles)
    return last.concat(feature)
  }, [])

  return new VectorLayer({
    source: new VectorSource({
      features: [].concat(iconFeatures)
    })
  })
}

const MARKER_DELEGATE = function(data) {
  let layer = createMarkerLayer(data)
  this.map.addLayer(layer)
  return layer
}

export default MARKER_DELEGATE
