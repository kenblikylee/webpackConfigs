const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  entry: {
    home: ['./src/index.js'],
    about: ['./src/about.js']
  },
  devtool: 'source-map', // inline-source-map cheap-source-map inline-cheap-source-map
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: './template.html',
      chunks: ['home']
    }),
    new HTMLWebpackPlugin({
      title: 'About',
      filename: 'about.html',
      template: './template.html',
      chunks: ['about']
    })
  ]
}
