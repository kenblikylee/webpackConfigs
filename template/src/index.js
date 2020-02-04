import 'file-loader!extract-loader!css-loader!./style.css'
// import '!!file-loader!extract-loader!html-loader!./html.html'
import './html.html'
import readme from './readme.md'
// import pugTmplate from '!!pug-loader!./pug.pug'
import pugHtml from './pug.pug'

console.log(readme)
// console.log(pugTmplate())
console.log('pugHtml', pugHtml)
