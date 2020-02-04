const baseConfig = require('./webpack.base.config')
const createStyleRules = require('./utils').createStyleRules
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

baseConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  })
)

module.exports = Object.assign(
  {
    mode: 'production',
    devtool: 'source-map', // inline-source-map cheap-source-map inline-cheap-source-map
    module: {
      rules: createStyleRules()
    }
  },
  baseConfig
)
