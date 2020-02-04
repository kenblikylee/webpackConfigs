const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  entry: {
    css: ['./src/index.css'],
    less: ['./src/index.less'],
    scss: ['./src/index.scss'],
    styl: ['./src/index.styl']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'style'
    })
  ]
}
