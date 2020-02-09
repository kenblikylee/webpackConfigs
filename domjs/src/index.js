import AMap from 'AMap'
import VMap from 'lib/vmap'
import { viewportSize } from 'utils'
import runApp from './app'

const mapContainer = document.getElementById('container')
let { width, height } = viewportSize()
mapContainer.style.width = `${width}px`
mapContainer.style.height = `${height}px`
const map = new AMap.Map('container', {
  zoom: 10,
  viewMode: '2D',
  lang:'zh_cn'
})

runApp(new VMap(map))