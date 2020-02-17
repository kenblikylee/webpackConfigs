/* eslint-disable */

import * as L from "@sw/leaflet";
import builtInPlugins from "./applyAllPlugins";

let mapapi = null;

export const createMap = () => {
  if (mapapi) return mapapi;
  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.position = 'fixed';
  mapContainer.style.top = 0;
  mapContainer.style.bottom = 0;
  mapContainer.style.width = '100%';

  document.body.insertAdjacentElement('afterbegin', mapContainer);
  const map = L.map("map", {
    center: [31.13760327002129, 121.33850097656251],
    zoom: 11
  });

  L.tileLayer("http://10.0.100.22:8082/styles/positron/{z}/{x}/{y}.png", {
    maxZoom: 18,
    minZoom: 10,
    attribution: "地图数据 &copy; 数位科技",
    id: "base"
  }).addTo(map);

  mapapi = {
    map,
    L,
    use(plugin) {
      plugin(map, L, mapapi);
    },
    show() {
      mapContainer.style.display = 'block'
    },
    hide() {
      mapContainer.style.display = 'none'
    }
  };
  mapapi.use(builtInPlugins);
  return mapapi;
};
