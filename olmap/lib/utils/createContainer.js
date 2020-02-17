export default function(id = 'map') {
  const mapContainer = document.createElement('div');
  mapContainer.id = id;
  mapContainer.style.position = 'fixed';
  mapContainer.style.top = 0;
  mapContainer.style.bottom = 0;
  mapContainer.style.width = '100%';
  document.body.insertAdjacentElement('afterbegin', mapContainer);
  return mapContainer;
}
