import * as L from '@sw/leaflet';
import runApp from './app';

// const map = L.map('map').setView([32.84267363195431, 109.86328125000001], 4);
const map = L.map('map', {
  center: [22.59372606392931, 114.09301757812501],
  zoom: 11
});

// L.tileLayer('http://10.0.100.22:8082/tile/{z}/{x}/{y}.png', {
L.tileLayer('http://10.0.100.22:8081/tile/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '地图数据 &copy; 数位科技',
  id: 'base'
}).addTo(map);

runApp(map, L);
