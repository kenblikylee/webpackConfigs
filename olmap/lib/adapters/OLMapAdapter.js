import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import { gcj02towgs84 } from "../utils";
import createContainer from '../utils/createContainer';
import MapAdapter from './MapAdapter';

export default class OLMapAdapter extends MapAdapter{
  constructor() {
    super()
    this.map = new Map({
      target: createContainer(),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://10.0.100.22:8082/styles/positron/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326', // WGS84
        center: gcj02towgs84(121.33850097656251, 31.13760327002129),
        zoom: 11
      })
    });
  }
}