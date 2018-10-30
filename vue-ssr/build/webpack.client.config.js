const baseConfig = require('./webpack.base.config');

const path = require('path');
const merge = require('webpack-merge');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const rootPath = path.resolve(__dirname, '..');
const distPath = path.resolve(rootPath, 'dist');

module.exports = merge(baseConfig, {
  entry: {
    index: path.resolve(rootPath, 'src/entry-client.js'),
    vendors: ['babel-polyfill', 'vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: 'js/[name].[hash].js'
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
    }
  },

  plugins: [new VueSSRClientPlugin()]
});
