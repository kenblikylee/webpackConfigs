const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: {
    main: './src/index.js',
    style: './theme/index.scss'
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: `sass-loader`,
            options: {
              sourceMap: true
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
      chunks: ['main', 'style'],
      excludeChunks: [],
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
      },
      hash: true
    })
  ]
}

if (isDev) {
  webpackConfig.devServer = {
    hot: true,
    open: true,
    host: '0.0.0.0'
  }
}

// 外部库
webpackConfig.externals = {
  AMap: 'AMap'
}
// 别名
webpackConfig.resolve = {
  alias: {
    lib: path.resolve(__dirname, 'src/lib')
  }
}

module.exports = webpackConfig
