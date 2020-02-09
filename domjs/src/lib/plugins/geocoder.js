import AMap from 'AMap'

export default function(VMap) {
  let geocoder
  VMap.prototype.getAddress = function(lnglat) {
    let map = this.map
    return new Promise((resolve, reject) => {
      const _getAdr = () => geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.regeocode) {
          resolve(result)
        } else {
          reject(new Error('根据经纬度查询地址失败'))
        }
      })
      if (!geocoder) {
        map.plugin('AMap.Geocoder', function () {
          geocoder = new AMap.Geocoder()
          _getAdr()
        })
      } else {
        _getAdr()
      }
    })
  }
}
