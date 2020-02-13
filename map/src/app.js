export default function run(map, L) {
  const r = require.context('./tasks', false, /\.js$/i);
  r.keys().forEach(k => {
    r(k).default(map, L);
  });
}
