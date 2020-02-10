export const createImg = url => {
  let img = new Image()
  img.src = 'https://qingbii.com/static/images' + url
  return img
}

export const viewportSize = () => {
  if (window.innerWidth && window.innerHeight) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (
    document.documentElement &&
    document.documentElement.clientWidth &&
    document.documentElement.clientHeight
  ) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    }
  }
}

export const cityPois2GeoJson = pois => {
  // 数据格式参考：http://geojson.io/
  return {
    type: 'FeatureCollection',
    features: pois.map(poi => {
      return {
        type: 'Feature',
        properties: {
          name: poi.name,
          center: poi.point.coordinates
        },
        geometry: poi.geometry
      }
    })
  }
}

export const cityPois2LngLats = pois => {
  return pois.map(poi => {
    return {
      lnglat: poi.geometry.coordinates[0]
    }
  })
}