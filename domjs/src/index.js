import { viewportSize } from './utils'
import AMap from 'AMap'
import VMap from './lib/vmap'

const mapContainer = document.getElementById('container')
let { width, height } = viewportSize()
mapContainer.style.width = `${width}px`
mapContainer.style.height = `${height}px`
const map = new AMap.Map('container')

const vmap = new VMap(map)
