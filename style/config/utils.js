const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const langTest = {
  css: /\.css$/i,
  less: /\.less$/i,
  sass: /\.s[ac]ss$/i,
  stylus: /\.styl(us)?$/i
}

const createStyleRule = (isDev, lang) => {
  let loaders = [
    {
      loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }
  ]
  if (['less', 'sass', 'stylus'].includes(lang)) {
    loaders.push({
      loader: `${lang}-loader`,
      options: {
        sourceMap: true
      }
    })
  }
  return {
    test: langTest[lang],
    use: loaders
  }
}

exports.createStyleRules = isDev =>
  ['css', 'less', 'sass', 'stylus'].map(lang => createStyleRule(isDev, lang))
