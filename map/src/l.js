import * as L from '@bikp/leaflet';
// import runApp from './app';
import { gcj02towgs84 as transform } from "@bikp/ol/lib/utils";

const map = L.map('mapL', {
  center: transform(121.33850097656251, 31.13760327002129).reverse(),
  zoom: 10
});

L.tileLayer('http://10.0.100.22:8082/styles/positron/{z}/{x}/{y}.png', {
  minZoom: 10,
  maxZoom: 19,
  attribution: '地图数据 &copy; qingbii.com',
  id: 'base'
}).addTo(map);

// runApp(map, L);
