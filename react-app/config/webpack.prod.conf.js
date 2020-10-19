const { merge } = require('webpack-merge');
const {
  baseWebpackConfig,
  buildCssLoadersConfig,
} = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, buildCssLoadersConfig(true), {
  mode: 'production',
});
