const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', "@vue/babel-preset-jsx"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({
      title: 'vue',
      template: 'index.html'
    })
  ]
}