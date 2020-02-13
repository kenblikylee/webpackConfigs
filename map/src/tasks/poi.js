const renderCityMarkers = (data, map, L) => {
  data
    .map(city => {
      return {
        latlng: city.center.coordinates.reverse(),
        title: city.name
      };
    })
    .forEach(({ latlng, title }) => {
      L.marker(latlng, {
        title
      }).addTo(map);
    });
};

const renderSzMarkers = (data, map, L) => {
  data[0].pois
    .map(poi => {
      return {
        latlng: poi.point.coordinates.reverse(),
        title: poi.name
      };
    })
    .forEach(({ latlng, title }) => {
      L.marker(latlng, {
        title
      })
        .bindTooltip(title, {
          direction: 'top'
        })
        .addTo(map);
    });
};

const renderSzPolygons = (data, map, L) => {
  data[0].pois
    .filter(poi => poi.geometry.type === 'Polygon')
    .map(poi => {
      let latlngs = poi.geometry.coordinates[0].map(lnglat => lnglat.reverse());
      return {
        latlngs,
        title: poi.name
      };
    })
    .forEach(({ latlngs, title }) => {
      L.polygon(latlngs, {
        color: 'red'
      })
        .bindPopup(title)
        .addTo(map);
    });
};

export default (map, L) => {
  map.on('click', function(ev) {
    console.log(ev.latlng);
  });
  fetch('https://cloud.papakaka.com/ncp/api/pub/city-region-cov')
    .then(res => res.json())
    .then(res => {
      // renderCityMarkers(res, map, L);
      renderSzMarkers(res, map, L);
      renderSzPolygons(res, map, L);
    });
};
