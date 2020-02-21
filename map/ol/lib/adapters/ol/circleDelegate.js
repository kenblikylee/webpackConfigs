import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Fill, Stroke, Circle as CircleStyle, Text } from 'ol/style';

let stroke = new Stroke({ color: 'white', width: 2 })
let fill = new Fill({ color: '#2F6EF8' })
let circle = new CircleStyle({ radius: 37, fill, stroke })

const createLayer = data => {
  let features = data.map(item => {
    let feature = new Feature({
      data: item,
      geometry: new Point(item.lnglat)
    })
    feature.setStyle(new Style({
      image: circle,
      text: new Text({
        font: '12px PingFangSC-Medium,PingFang SC',
        fill: new Fill({ color: '#ffffff' }),
        text: item.name + '\n'  + item.value + '',
        offsetY: 0
      })
    }))
    return feature
  })

  return new VectorLayer({
    source: new VectorSource({
      features
    })
  })
}

const CIRCLE_DELEGATE = function(data) {
  let layer = createLayer(data)
  this.map.addLayer(layer)
  return layer
}

export default CIRCLE_DELEGATE
