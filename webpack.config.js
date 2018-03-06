const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const PATHS = {
  source: path.join(__dirname, 'src/index.js'),
  dist: path.join(__dirname, 'dist')
}
module.exports = {
  entry: {
    app: PATHS.source
  },
  output: {
    path: PATHS.dist,
    filename: 'index.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'standard-loader',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    }]
  },
  devtool: 'source-map',
  plugins: [
   new ExtractTextPlugin('style.css')
  ]
}
