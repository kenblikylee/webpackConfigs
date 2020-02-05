const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              cache: true
            }
          }
        ]
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
