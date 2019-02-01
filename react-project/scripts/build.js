const baseConfig = require('./base');
const webpackProdConfig = require('../config/webpack.prod.conf');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = function(config, webpackConfig) {
  config = Object.assign(baseConfig, config);

  webpackConfig = merge(webpackProdConfig, webpackConfig, {
    devServer: config.devServer || {}
  });
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true // Shows colors in the console
      })
    );
  });
};
