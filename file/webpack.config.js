const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

module.exports = {
  module: {
    rules: [
      {
        test: /\.(txt|md)$/i,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'file'
    })
  ]
}
