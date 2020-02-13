import AMap from 'AMap';

export default function(VMap) {
  let district;
  VMap.prototype.district = function(kw, level = 'district') {
    const _search = (resolve, reject) => {
      district.setLevel(level);
      district.search(kw, (status, result) => {
        if (status === 'complete') resolve(result);
        else reject(status);
      });
    };
    return new Promise((resolve, reject) => {
      if (!district) {
        AMap.plugin('AMap.DistrictSearch', function() {
          district = new AMap.DistrictSearch({
            subdistrict: 1,
            extensions: 'all',
            level
          });
          _search(resolve, reject);
        });
      } else {
        _search(resolve, reject);
      }
    });
  };

  VMap.prototype.worldLayer = function() {
    return VMap.use('AMap.DistrictLayer').then(() => {
      let layer = new AMap.DistrictLayer.World({
        zIndex: 10,
        styles: {
          // 颜色格式: #RRGGBB、rgba()、rgb()、[r,g,b,a]
          'nation-stroke': function(props) {
            // props: { type: Nation_Border_China/Nation_Border_Foreign }
            if (props.type == 'Nation_Border_China') {
              return 'red';
            } else {
              return 'white';
            }
          },
          'coastline-stroke': [0.8, 0.63, 1, 1],
          fill: function(props) {
            console.log(props);
            return 'yellow';
          }
        }
      });
      return layer;
    });
  };

  VMap.prototype.countryLayer = function() {
    return VMap.use('AMap.DistrictLayer').then(() => {
      let layer = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 1,
        styles: {
          'nation-stroke': '#22ffff',
          'coastline-stroke': [0.85, 0.63, 0.94, 1],
          'province-stroke': 'white',
          'city-stroke': 'rgba(255,255,255,0.5)', //中国特有字段
          fill: function(props) {
            // 中国特有字段
            console.log(props);
            return 'red';
          }
        }
      });
      return layer;
    });
  };

  VMap.prototype.provinceLayer = function(code, dep = 1) {
    return VMap.use('AMap.DistrictLayer').then(() => {
      let layer = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [code],
        depth: dep,
        styles: {
          fill: function(props) {
            // 中国特有字段
            console.log(`${props.NAME_CHN}:${props.adcode_cit}`);
            return 'red';
          },
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'white', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        }
      });
      return layer;
    });
  };
}
