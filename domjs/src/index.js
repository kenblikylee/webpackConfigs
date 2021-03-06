import AMap from 'AMap';
import VMap from 'lib/vmap';
// import { viewportSize } from 'utils';
import runApp from './app';
import 'theme';

const mapContainer = document.getElementById('container');
// let { width, height } = viewportSize()
// mapContainer.style.width = `${width}px`
// mapContainer.style.height = `${height}px`
mapContainer.style.position = 'fixed';
mapContainer.style.top = 0;
mapContainer.style.bottom = 0;
mapContainer.style.width = '100%';

const map = new AMap.Map('container', {
  viewMode: '2D',
  lang: 'zh_cn',
  resizeEnable: true,
  layers: [
    new AMap.TileLayer()
  ],
  mapStyle: 'amap://styles/whitesmoke',
  features: ['bg', 'road'] // ['bg', 'point', 'road', 'building']
});

// map.setCity(310000);
// map.setZoom(4);
// map.setZoomAndCenter(3, [104, 9]);
map.setZoomAndCenter(10, [121.33850097656251, 31.13760327002129]);

window.map = map;

runApp(new VMap(map));
