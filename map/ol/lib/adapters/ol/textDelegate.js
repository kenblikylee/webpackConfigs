import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Style, Fill, Text } from 'ol/style';

let fill = new Fill({ color: '#ffffff' })
let backgroundFill = new Fill({ color: '#2F6EF8' })

const createLayer = data => {
  let features = data.map(item => {
    let feature = new Feature({
      data: item,
      geometry: new Point(item.lnglat)
    })
    feature.setStyle(new Style({
      text: new Text({
        font: '16px PingFangSC-Medium,PingFang SC',
        fill,
        backgroundFill,
        padding: [5, 10, 5, 10],
        text: item.name,
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

const TEXT_DELEGATE = function(data) {
  let layer = createLayer(data)
  this.map.addLayer(layer)
  return layer
}

export default TEXT_DELEGATE
