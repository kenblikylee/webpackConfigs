import txt from '!!raw-loader!./readme.md'
import avatar from './avatar.jpg'

let pre = document.createElement('pre')
pre.innerHTML = txt
document.body.appendChild(pre)

let img = new Image()
img.src = avatar
document.body.insertBefore(img, pre)
