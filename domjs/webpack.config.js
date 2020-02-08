const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: {
    main: './src/index.js'
  },
  output: {
    path:  path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].[hash].js' : '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'domjs',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['main'],
      excludeChunks: [],
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      hash: true
    })
  ]
}

if (isDev) {
  webpackConfig.devServer = {
    hot: true,
    open: true
  }
}

module.exports = webpackConfig
