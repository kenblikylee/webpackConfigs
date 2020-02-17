/* eslint-disable */
import { gcj02towgs84 } from "../utils";

const renderMarkers = (data, map, L) => {
  data.forEach(item =>
    item.pois
    .map(poi => {
      return {
        latlng: gcj02towgs84(...poi.point.coordinates).reverse(),
        title: poi.name
      };
    })
    .forEach(({ latlng, title }) => {
      L.marker(latlng, {
        title
      })
        .bindTooltip(title, {
          direction: "top"
        })
        .addTo(map);
    }))
}

const renderPolygons = (data, map, L) => {
  data.forEach(item =>
    item.pois
    .filter(poi => poi.geometry.type === "Polygon")
    .map(poi => {
      let latlngs = poi.geometry.coordinates[0].map(lnglat => gcj02towgs84(...lnglat).reverse());
      return {
        latlngs,
        title: poi.name
      };
    })
    .forEach(({ latlngs, title }) => {
      L.polygon(latlngs, {
        color: "red"
      })
        .bindPopup(title)
        .addTo(map);
    }))
}

export default (map, L, api) => {
  api.renderMarkers = data => {
    renderMarkers(data, map, L)
  }
  api.renderPolygons = data => {
    renderPolygons(data, map, L)
  }
};
