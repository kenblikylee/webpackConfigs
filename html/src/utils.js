export const getOffsetRect = ele => {
  let {
    offsetLeft: x,
    offsetTop: y,
    offsetWidth: width,
    offsetHeight: height
  } = ele
  return {
    x,
    y,
    width,
    height
  }
}

export const print = (...args) => console.log(...args)
