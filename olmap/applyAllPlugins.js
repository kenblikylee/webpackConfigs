/* eslint-disable */

export default function(map, L, api) {
  const r = require.context("./plugins", false, /\.js$/i);
  r.keys().forEach((k) => {
    r(k).default(map, L, api);
  });
}
