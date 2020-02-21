import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Style, Fill, Stroke } from 'ol/style';

let stroke = new Stroke({ color: '#CCD6D7', width: 2 })
let fill = new Fill({ color: 'rgb(255,255,255)' })

const createLayer = data => {
  let features = data.map(item => {
    let feature = new Feature({
      data: item,
      geometry: new Polygon(item.lnglats)
    })
    feature.setStyle(new Style({
      fill,
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

const POLYGON_DELEGATE = function(data) {
  let layer = createLayer(data)
  this.map.addLayer(layer)
  return layer
}

export default POLYGON_DELEGATE
