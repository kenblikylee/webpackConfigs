import { createMap } from '../index';
import axios from 'axios';

const map = createMap();

map.$on('click', e => {
  if (e.data) {
    let { data: { type, name }, coordinate, $event, map, view } = e
    switch(type) {
      case 'district':
        console.log('点击区 district', name, coordinate, e.data)
        view.setCenter(coordinate)
        view.setZoom(12)
        break
      case 'town':
        console.log('点击镇 town', name, coordinate, e.data)
        view.setCenter(coordinate)
        view.setZoom(14)
        break
      case 'village':
        console.log('点击村 village', name, coordinate, e.data)
        view.setZoom(15)
        break
      case 'bank':
        console.log('点击银行 bank', name, coordinate, e.data)
        view.setZoom(15)
        break
      case 'ynt':
        console.log('点击裕农通 ynt', name, coordinate, e.data)
        view.setZoom(15)
        break
      case 'organization':
        console.log('点击重点经济组织 organization', name, coordinate, e.data)
        view.setZoom(15)
        break
    }
    // 不传参数注销所有事件
    // map.$off()
  } else {
    console.log('点击地图', e.coordinate, e)
  }
})

map.$on('zoom', zoom => {
  console.log('zoom', zoom)
})

map.$on('movestart', e  => {
  console.log('movestart', e)
})

map.$on('moveend', e => {
  console.log('moveend', e)
})

const typeDefs = {
  '00': 'district', // 区中心点
  '01': 'town', // 镇政府
  '02': 'village', // 村委会
  '03': 'bank', // 银行
  '04': 'ynt', // 裕农通
  '05': 'organization' // 重点经济组织：龙头企业，合作社，家庭农场
}

const transformTypeData = data => {
  let typeData = {}
  for (let type in data) {
    typeData[typeDefs[type+'']] = data[type]
  }
  return typeData
}

const extractTypeData = (type, data) => data[type] || []

axios.post('/api/scenePoi/domain', {
  scaleLevel: 10,
  minLng: 133.234543,
  minLat: 12.234455,
  maxLng: 134.324324,
  maxLat: 12.343245
}).then(function (response) {
  let { code, data } = response.data;
  data = transformTypeData(data);
  let districtLayer = map.district(extractTypeData('district', data))
  let townLayer = map.town(extractTypeData('town', data))
  let villageLayer = map.village(extractTypeData('village', data))
  let bankLayer = map.bank(extractTypeData('bank', data))
  let yntLayer = map.ynt(extractTypeData('ynt', data))
  let organizationLayer = map.organization(extractTypeData('organization', data))

  districtLayer.setMinZoom(9)
  districtLayer.setMaxZoom(11)
  districtLayer.setZIndex(1)
  // districtLayer.setVisible(false)

  townLayer.setMinZoom(11)
  townLayer.setMaxZoom(12)
  townLayer.setZIndex(2)
  // townLayer.setVisible(false)

  villageLayer.setMinZoom(12)
  villageLayer.setZIndex(3)
  // villageLayer.setMaxZoom(15)
  // villageLayer.setVisible(false)

  bankLayer.setMinZoom(13)
  bankLayer.setZIndex(4)
  // bankLayer.setVisible(false)

  yntLayer.setMinZoom(13)
  yntLayer.setZIndex(4)
  // yntLayer.setVisible(false)

  organizationLayer.setMinZoom(13)
  organizationLayer.setZIndex(4)
  // organizationLayer.setVisible(false)

  // 显示热力图
  let heatData = extractTypeData('village', data)
  let heatLayer = map.heat(heatData)
  heatLayer.setMinZoom(11)
  heatLayer.setMaxZoom(12)
  heatLayer.setZIndex(0)
  heatLayer.setOpacity(0.92)
  heatLayer.setRadius(16)
  heatLayer.setBlur(32)
  heatLayer.setGradient(['#2F6EF8', '#ABFF3B', '#FFFB3B', '#FF8520', '#FF5634'])
})
.catch(function (error) {
  console.log(error);
});

axios.get('api/district/tree').then(res => {
  console.log('api/district/tree', res.data.data)
})
