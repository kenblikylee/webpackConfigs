import AMap from 'AMap'
import VMap from 'lib/vmap'
import { viewportSize } from 'utils'
import runApp from './app'
import 'theme'

const mapContainer = document.getElementById('container')
let { width, height } = viewportSize()
mapContainer.style.width = `${width}px`
mapContainer.style.height = `${height}px`
const map = new AMap.Map('container', {
  viewMode: '2D',
  lang:'zh_cn',
  resizeEnable: true
})

runApp(new VMap(map))
