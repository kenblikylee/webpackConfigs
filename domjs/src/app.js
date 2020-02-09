export default function run (vmap) {
  const r = require.context('./plugins', false, /\.js$/i)
  r.keys().forEach(k => {
    r(k).default(vmap)
  })
}
