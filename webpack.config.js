const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderConfig = require('./build/vue-loader.conf.js')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, './src'),
  entry: {
    popup: './popup/index.js',
    background: './background/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'popup',
      template: './popup/index.html',
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        { from: 'assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' },
      ]
    }),
    new VueLoaderPlugin()
  ]
}