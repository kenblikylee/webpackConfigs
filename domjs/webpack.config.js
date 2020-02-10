const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path:  path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].[hash].js' : '[name].js',
    publicPath: ''
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
      title: '2019-nCoV 疫情地图',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['app'],
      excludeChunks: [],
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
      },
      hash: true
    })
  ]
}

if (isDev) {
  const proxy = {
    '/api/2019-nCov': {
      target: 'https://cloud.papakaka.com',
      pathRewrite: {'^/api/2019-nCov' : '/2019-nCov/api'}
    }
  }
  webpackConfig.devServer = {
    hot: true,
    open: true,
    host: '0.0.0.0',
    proxy
  }
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin({}))
} else {
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }))
}

// 外部库
webpackConfig.externals = {
  AMap: 'AMap',
  Loca: 'Loca'
}
// 别名
webpackConfig.resolve = {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    lib: path.resolve(__dirname, 'src/lib'),
    utils: path.resolve(__dirname, 'src/utils'),
    theme$: path.resolve(__dirname, 'theme/index.scss')
  }
}
// copy
const CopyWebpackPlugin = require('copy-webpack-plugin')
webpackConfig.plugins.push(new CopyWebpackPlugin([
  {
    from: 'static',
    to: 'static',
    ignore: ['.*']
  }
]))

module.exports = webpackConfig
