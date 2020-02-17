import { createMap } from './index';
import SWMap from './lib/SWMap';

const mapapi = createMap();

// 点击事件
mapapi.$on('click', e => {
  console.log(e)
})

// 自定义事件
mapapi.$on('poiReceived', res => {
  mapapi.renderMarkers(res);
  mapapi.renderPolygons(res);
})

// 触发自定义事件
fetch("https://cloud.papakaka.com/ncp/api/pub/city-region-cov")
  .then(res => res.json())
  .then(res => {
    mapapi.$emit('poiReceived', res)
  });

new SWMap(mapapi.map).marker([1, 2, 3])
