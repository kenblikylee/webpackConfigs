import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Polygon, MultiPoint } from 'ol/geom';
import { Style, Fill, Stroke } from 'ol/style';

let stroke = new Stroke({ color: '#2F6EF8', width: 2 })

const createLayer = data => {
  let features = data.map(item => {
    let feature = new Feature({
      data: item,
      geometry: new Polygon([item.lnglats])
    })
    feature.setStyle(new Style({
      stroke
    }))
    return feature
  })

  return new VectorLayer({
    source: new VectorSource({
      features
    })
  })
}

const POLYLINE_DELEGATE = function(data) {
  let layer = createLayer(data)
  this.map.addLayer(layer)
  return layer
}

export default POLYLINE_DELEGATE
