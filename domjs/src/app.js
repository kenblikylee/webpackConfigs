export default function run (vmap) {
  fetch('/api/2019-nCov/pub/city-region-cov').then(res => res.json()).then(res => {
    console.table(res.map(item => {
      return {
        name: item.name,
        province: item.province,
        updated_at: item.updated_at,
        poisNum: item.pois.length,
        center: item.center.coordinates.join(',')
      }
    }))
  })
  let userPosition
  vmap.locate().then(res => {
    userPosition = res.position
    console.log('定位成功', res)
    // alert(res.location_type + ':' + res.formattedAddress + ':' + res.position)
  }).catch(err => {
    alert(err.message)
  })
  vmap.setZoom(10)
}
