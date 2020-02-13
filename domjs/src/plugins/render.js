import labelsData from '@/data/labels';
import { cityPois2LngLats } from 'utils';

// const shapePath = [
//   [113.9341579999983, 22.507894999996974],
//   [113.9334719999985, 22.507845999997294],
//   [113.9335149999985, 22.506100999997283],
//   [113.93517799999793, 22.50615099999646],
//   [113.9353279999979, 22.50647799999638],
//   [113.9353279999979, 22.506546999996377],
//   [113.93700199999722, 22.506566999995396],
//   [113.93696899999725, 22.509867999995393],
//   [113.93403999999833, 22.509827999997015],
//   [113.9341579999983, 22.507894999996974]
// ];

export default vmap => {
  // vmap.circleMarker([113.925046, 22.527716])
  // vmap.text([113.925046, 22.5295], '文本')
  // vmap.polygon(shapePath)
  // vmap.bezierCurve(shapePath)
  // vmap.setZoomAndCenter(15, [113.9341579999983, 22.507894999996974])
  // vmap.circle([113.9334719999985, 22.512845999997294], 200)
  // vmap.ellipse([113.9334719999985, 22.512845999997294], [200, 100])
  // vmap.rectangle([113.9334719999985, 22.512845999997294], [113.9341579999983, 22.507894999996974])
  // vmap.labelsLayer(labelsData, false)
  vmap.renderCityPois = function(city) {
    let pois = [];
    let cityData;
    if (typeof city === 'string') {
      cityData = vmap.citypois.find(item => item.name.includes(city));
      pois = cityData.pois;
    } else {
      pois = vmap.citypois.reduce((pois, city) => {
        return pois.concat(city.pois);
      }, []);
    }
    let poiPolygons = pois.filter(item => item.geometry.type === 'Polygon');
    let poiLabels = pois.map(item => {
      return {
        text: item.name,
        position: item.point.coordinates
      };
    });
    this.polygonLayer(cityPois2LngLats(poiPolygons));
    this.labelsLayer(poiLabels);
    if (cityData) {
      let center = cityData.center.coordinates;
      this.setZoomAndCenter(9, center);
    } else {
      this.fit();
    }
  };
  vmap.$on('citypois', citypois => {
    vmap.citypois = citypois;
  });
  vmap.$on('locate', ({ position, city }) => {
    console.log('locate', position, city);
    // vmap.renderCityPois(city);
  });
  vmap.$on('locateFailed', err => {
    console.error('locateFailed', err);
  });
  let markers = null;
  vmap.$on(
    'click',
    ({
      lng,
      lat,
      address,
      country,
      province,
      city,
      district,
      township,
      street,
      streetNumber,
      citycode,
      adcode
    }) => {
      console.table([
        { district, township, street, streetNumber, citycode, adcode, lng, lat }
      ]);
      let text = '';
      let zoom_level = vmap.getZoom();
      if (zoom_level < 6) {
        text = `${province}: ${lng}, ${lat}`;
      } else if (zoom_level < 10) {
        text = `${province}${city}${district}`;
      } else {
        text = `${district}${township}${street}${streetNumber}`;
      }
      if (!markers) {
        markers = [vmap.text([lng, lat], text), vmap.marker([lng, lat])];
      } else {
        markers[0].setPosition([lng, lat]);
        markers[1].setPosition([lng, lat]);
        markers[0].setText(text);
      }
    }
  );

  const drawBoundary = ({ districtList }) => {
    let { center, boundaries } = districtList[0];
    boundaries.forEach(boundary => {
      vmap.polygon(boundary);
    });
    vmap.setCenter(center);
    vmap.fit();
  };

  let layers = [];
  // vmap.district('0755').then(drawBoundary)
  // vmap.district('深圳', 'city').then(res => {
  //   console.log(res.districtList[0].districtList);
  //   let provinces = res.districtList[0].districtList.map(
  //     ({ adcode, name, level, center: { lng, lat } }) => {
  //       return {
  //         adcode,
  //         name,
  //         level,
  //         center: { lng, lat }
  //       };
  //     }
  //   );
  //   // console.table(provinces)
  //   // console.log(JSON.stringify(provinces))
  // });
  // vmap.setZoomAndCenter(3, [104, 9]);
  // vmap.worldLayer()
  // vmap.countryLayer().then(layer => {
  //   layers.push(layer);
  //   vmap.fit();
  // });
  // vmap.provinceLayer(440000, 1).then(layer => {
  //   layers.push(layer);
  // });
};
