let CityCovPois = null 

export default vmap => {
  fetch('/api/2019-nCov/pub/city-region-cov').then(res => res.json()).then(res => {
    CityCovPois = res
    // console.table(res.map(item => {
    //   return {
    //     name: item.name,
    //     province: item.province,
    //     updated_at: item.updated_at,
    //     poisNum: item.pois.length,
    //     center: item.center.coordinates.join(',')
    //   }
    // }))
    console.log(CityCovPois)
  })
  let userPosition
  vmap.locate().then(res => {
    userPosition = res.position
    // alert(res.location_type + ':' + res.formattedAddress + ':' + res.position)
  }).catch(err => {
    // alert(err.message)
  })
  vmap.setZoom(10)
  vmap.on('click', function(e) {
    let { lng, lat } = e.lnglat
    this.setZoomAndCenter(13, [lng, lat])
    this.getAddress([lng, lat]).then(res => {
      let address = res.regeocode.formattedAddress
      let { country, province, city, district, township, street, streetNumber, citycode, adcode } = res.regeocode.addressComponent
      console.log(address)
      console.table([{ province, city, district, township, street, streetNumber, citycode, adcode, lng, lat }])
    }).catch(err => {
      console.error(err)
    })
  }, vmap)
}