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
  },
  VMap.prototype.getLocation = function(adr) {
    let map = this.map
    return new Promise((resolve, reject) => {
      const _getLoc = () => geocoder.getLocation(adr, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result)
        } else {
          reject(new Error('根据地址查询经纬度失败'))
        }
      })
      if (!geocoder) {
        map.plugin('AMap.Geocoder', function () {
          geocoder = new AMap.Geocoder()
          _getLoc()
        })
      } else {
        _getLoc()
      }
    })
  }
}
