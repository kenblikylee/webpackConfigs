export default function(id = 'map', _style = {}) {
  const mapContainer = document.createElement('div');
  mapContainer.id = id;
  let style = Object.assign({
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%'
  }, _style)
  for (let attr in style) {
    mapContainer.style[attr] = style[attr];
  }
  document.body.insertAdjacentElement('afterbegin', mapContainer);
  return mapContainer;
}
