const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const marked = require('marked')
const renderer = new marked.Renderer()

module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      {
        test: /\.html$/i,
        use: [
          'file-loader',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              // attributes: [],
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.md$/i,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer
            }
          }
        ]
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'apply-loader'
          },
          {
            loader: 'pug-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'template'
    })
  ]
}
