export const createImg = url => {
  let img = new Image()
  img.src = 'https://qingbii.com/static/images' + url
  return img
}

export const viewportSize = () => {
  if (window.innerWidth && window.innerHeight) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (
    document.documentElement &&
    document.documentElement.clientWidth &&
    document.documentElement.clientHeight
  ) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    }
  }
}
