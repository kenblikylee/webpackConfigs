export const createImg = url => {
  let img = new Image()
  img.src = 'https://qingbii.com/static/images' + url
  return img
}
