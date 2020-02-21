/* eslint-disable */
import 'ol/ol.css';
import BMap from './lib/BMap';
import OLMapAdapter from './lib/adapters/OLMapAdapter';
import { gcj02towgs84 as transform } from "./lib/utils";
// import cityBoundaries from './data/sh/city.json'

// let boundaries = cityBoundaries.boundaries.map(boundary => {
//   return {
//     lnglats: boundary.map(([lng, lat]) => {
//       return transform(lng, lat)
//     })
//   }
// })

// const transform = (lng, lat) => {
//   return [lng, lat]
// }

const iconResolve = icon => `static/icons/${icon}.png`

const ICONS = {
  ynt: iconResolve('ynt'), // 裕农通
  bank: iconResolve('bank'), // 通用银行ICON
  ccb: iconResolve('bank-ccb'), // 建设银行
  icbc: iconResolve('bank-icbc'), // 工商银行
  china: iconResolve('bank-china'), // 中国银行
  abc: iconResolve('bank-abc'), // 农业银行
  pf: iconResolve('bank-pf'), // 浦发银行
  shns: iconResolve('bank'), // 上海农商银行
  cmbc: iconResolve('bank-cmbc'), // 招商银行
  organization: iconResolve('organization')
}

const bankSubtype2IconName = subtype => {
  return {
    '0301': 'ccb', // 建设银行
    '0302': 'icbc', // 工商银行
    '0303': 'china', // 中国银行
    '0304': 'abc', // 农业银行
    '0305': 'pf', // 浦发银行
    '0306': 'shns', // 上海农村商业银行
  }[subtype+''] || 'bank'
}

// 区
function district(data) {
  let style = {
    font: '12px PingFangSC-Medium,PingFang SC,sans-serif',
    offsetY: 13,
    scale: 0.5,
    fill: '#8C96AC'
  }
  const _transform = data => data.map(item => {
    item.type = 'district'
    item.icon = iconResolve('point')
    item.lnglat = transform(item.lng, item.lat)
    item.lnglats = item.shape.split('|').map(item => {
      return item.split(';').map(lnglatstr => {
        let [ lng, lat ] = lnglatstr.split(',').map(v => Number(v))
        return transform(lng, lat)
      })
    })
    item.value = item.count || 0
    item.style = style
    return item
  })
  data = _transform(data)
  let layer = this.polygon(data)
  layer.setMaxZoom(12)
  // console.log('district', data)
  return this.marker(data)
}
// 镇
function town(data) {
  const _transform = data => data.map(item => {
    item.type = 'town'
    item.lnglat = transform(item.lng, item.lat)
    item.value = item.count || 0
    return item
  })
  data = _transform(data)
  console.log('town', data)
  return this.circle(data)
}
// 村
function village(data) {
  let style = {
    font: '12px PingFangSC-Medium,PingFang SC,sans-serif',
    offsetY: 26,
    scale: 0.5,
    fill: '#39455F'
  }
  const _transform = data => data.map(item => {
    item.type = 'village'
    item.lnglat = transform(item.lng, item.lat)
    item.icon = iconResolve('marker')
    item.style = style
    return item
  })
  data = _transform(data)
  console.log('village', data)
  return this.marker(data)
}
// 银行网点
function bank(data) {
  let style = {
    font: '12px PingFangSC-Medium,PingFang SC,sans-serif',
    offsetY: 26,
    scale: 0.5,
    fill: '#39455F',
    noText: true
  }
  const _transform = data => data.map(item => {
    item.type = 'bank'
    item.icon = ICONS[bankSubtype2IconName(item.subType)]
    item.lnglat = transform(item.lng, item.lat)
    item.style = style
    return item
  })
  data = _transform(data)
  return this.marker(data)
}
// 裕农通
function ynt(data) {
  let style = {
    font: '12px PingFangSC-Medium,PingFang SC,sans-serif',
    offsetY: 26,
    scale: 0.5,
    fill: '#39455F',
    noText: true
  }
  const _transform = data => data.map(item => {
    item.type = 'ynt'
    item.lnglat = transform(item.lng, item.lat)
    item.icon = iconResolve('ynt')
    item.style = style
    return item
  })
  data = _transform(data)
  console.log('ynt', data)
  return this.marker(data)
}
// 重点经济组织
function organization(data) {
  let style = {
    font: '12px PingFangSC-Medium,PingFang SC,sans-serif',
    offsetY: 26,
    scale: 0.5,
    fill: '#39455F',
    noText: true
  }
  const _transform = data => data.map(item => {
    item.type = 'organization'
    item.lnglat = transform(item.lng, item.lat)
    item.icon = ICONS['organization']
    item.style = style
    return item
  })
  data = _transform(data)
  console.log('organization', data)
  return this.marker(data)
}

let map = null;
export const createMap = () => {
  if (map) return map;
  map = new BMap(new OLMapAdapter('mapOL'))
  map.transform = transform // 将高德经纬度转换成 WGS84 transform(lng, lat):[lng, lat]
  map.district = district.bind(map)
  map.town = town.bind(map)
  map.village = village.bind(map)
  map.bank = bank.bind(map)
  map.ynt = ynt.bind(map)
  map.organization = organization.bind(map)
  return map;
};
