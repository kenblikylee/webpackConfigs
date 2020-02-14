export default function run (vmap) {
  const r = require.context('./tasks', false, /\.js$/i)
  r.keys().forEach(k => {
    r(k).default(vmap)
  })
}
