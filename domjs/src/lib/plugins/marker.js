import AMap from 'AMap'

export default function(VMap) {
  VMap.prototype.marker = function(lnglat, text, icon) {
    let marker = new AMap.Marker({
      position: lnglat,
      title: text,
      icon: new AMap.Icon({            
        size: new AMap.Size(40, 50),
        image: icon,
        imageOffset: new AMap.Pixel(0, -60),
        // imageSize: new AMap.Size(40, 50)
      }),
      anchor: 'bottom-center', // 'top-left'、'top-center'、'top-right'、'middle-left'、'center'、'middle-right'、'bottom-left'、'bottom-center'、'bottom-right' 
      // content: ''
    });
    this.map.add(marker)
    return this
  }
}
