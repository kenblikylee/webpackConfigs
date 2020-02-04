const baseConfig = require('./webpack.base.config')
const createStyleRules = require('./utils').createStyleRules

module.exports = Object.assign(
  {
    mode: 'development',
    devtool: 'inline-source-map', // inline-source-map cheap-source-map inline-cheap-source-map
    module: {
      rules: createStyleRules(true)
    },
    devServer: {
      hot: true,
      open: true
    }
  },
  baseConfig
)
