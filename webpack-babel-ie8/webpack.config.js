const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

const externals = {
  'es5-shim.min.js': 'node_modules/es5-shim/es5-shim.min.js',
  'es5-sham.min.js': 'node_modules/es5-shim/es5-sham.min.js'
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './src/index.js',
    vendors: ['es5-shim', 'es5-shim/es5-sham', '@babel/polyfill']
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js'
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
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          ie8: true
        }
      })
    ]
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
          new CopyWebpackPlugin(
            Object.keys(externals).map(k => ({
              from: externals[k],
              to: path.join(distPath, 'libs')
            }))
          ),
          new HTMLWebpackPlugin({
            title: 'Webpack-Babel-IE8',
            template: 'src/index.ejs'
          }),
          new HtmlWebpackIncludeAssetsPlugin({
            assets: Object.keys(externals).map(k => 'libs/' + k),
            append: false
          })
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  )
};
