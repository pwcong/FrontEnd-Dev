const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: distPath,
    filename: 'js/bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true
  },
  plugins: [new CleanWebpackPlugin(distPath)].concat(
    isProd
      ? [
          new HTMLWebpackPlugin({
            title: 'Webpack-Babel',
            template: 'src/index.ejs'
          })
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  )
};
