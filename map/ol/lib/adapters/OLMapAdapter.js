import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ScaleLine from 'ol/control/ScaleLine'

import { gcj02towgs84 } from "../utils";
import createContainer from '../utils/createContainer';
import MapAdapter from './MapAdapter';

import markerDelegate from './ol/markerDelegate';
import circleDelegate from './ol/circleDelegate';
import polygonDelegate from './ol/polygonDelegate';
import polylineDelegate from './ol/polylineDelegate';
import textDelegate from './ol/textDelegate';
import heatDelegate from './ol/heatDelegate';

class OLMapAdapter extends MapAdapter{
  constructor(el) {
    super()
    this.name = 'OLMapAdapter'
    this.target = (typeof el === 'string' ? document.getElementById(el) : el) || createContainer('mapOL')
    this.zoom = 10
    this.map = new Map({
      target: this.target,
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
        zoom: this.zoom,
        minZoom: 10,
        maxZoom: 19
      })
    });
    let scaleLineControl = new ScaleLine({
        //设置度量单位为米
        units: 'metric',
        target: 'scalebar',
        className: 'ol-scale-line'
    });
    this.map.addControl(scaleLineControl);
    this._events = {}
    let that = this
    this.map.on('click', function(evt) {
      let feature = that.map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          return feature;
        });
      if (feature) {
        let e = {}
        e.data = feature.get('data') || {}
        e.coordinate = feature.getGeometry().getCoordinates()
        e.$event = evt.pointerEvent
        e.map = evt.map
        e.view = evt.map.getView()
        that.$emit('click', e)
      } else {
        that.$emit('click', evt)
      }
    })
    this.map.on('movestart', function(e) {
      that.$emit('movestart', {
        center: that.map.getView().getCenter(),
        zoom: that.map.getView().getZoom()
      })
    })
    this.map.on('moveend', function(e) {
      let zoom = Math.round(that.map.getView().getZoom())
      if (that.zoom !== zoom) {
        that.zoom = zoom
        that.$emit('zoom', zoom)
      } else {
        that.$emit('moveend', {
          center: that.map.getView().getCenter(),
          zoom
        })
      }
    })
  }
  show() {
    this.target.style.display = 'block'
  }
  hide() {
    this.target.style.display = 'none'
  }
}

OLMapAdapter.prototype.marker = markerDelegate;
OLMapAdapter.prototype.circle = circleDelegate;
OLMapAdapter.prototype.polygon = polygonDelegate;
OLMapAdapter.prototype.polyline = polylineDelegate;
OLMapAdapter.prototype.text = textDelegate;
OLMapAdapter.prototype.heat = heatDelegate;

const _events = {}
OLMapAdapter.prototype.$emit = function(event, payload) {
  let _events = this._events
  if (_events[event]) {
    _events[event].handlers.forEach(handler => handler(payload))
  }
};
OLMapAdapter.prototype.$on = function(event, handler) {
  let _events = this._events
  if (_events[event]) {
    _events[event].handlers.push(handler)
  } else {
    _events[event] = {
      handlers: [
        handler
      ]
    }
  }
};
OLMapAdapter.prototype.$off = function() {
  this._events = {}
}

export default OLMapAdapter
