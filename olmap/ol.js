import 'ol/ol.css';
import SWMap from './lib/SWMap';
import OLMapAdapter from './lib/adapters/OLMapAdapter';
import { gcj02towgs84 } from "./lib/utils";

let map = new SWMap(new OLMapAdapter())

const transform = (res) => {
  return res.reduce((last, item) => {
    return last.concat(
      item.pois.map(poi => {
        return {
          latlng: gcj02towgs84(...poi.point.coordinates),
          title: poi.name
        };
      })
    )
  }, [])
}

fetch("https://cloud.papakaka.com/ncp/api/pub/city-region-cov")
  .then(res => res.json())
  .then(res => {
    map.marker(res, transform)
  });
