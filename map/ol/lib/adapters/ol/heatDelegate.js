import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';

const HEAT_DELEGATE = function(data) {
  let features = data.map(item => {
    return new Feature({
      data: item,
      geometry: new Point(item.lnglat)
    })
  })
  let source = new VectorSource({
    features
  })
  // https://openlayers.org/en/latest/apidoc/module-ol_layer_Heatmap-Heatmap.html
  let layer = new Heatmap({
    source
  })
  this.map.addLayer(layer)
  return layer
}

export default HEAT_DELEGATE
