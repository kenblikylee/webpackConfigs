const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'babel'
    })
  ]
}
