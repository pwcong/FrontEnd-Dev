const build = require('../../scripts/build');
const merge = require('webpack-merge');
const baseConfig = require('./base');
const webpackProdConfig = require('../config/webpack.prod.conf');

const config = {};

const webpackConfig = {};

build(
  Object.assign(baseConfig, config),
  merge(webpackProdConfig, webpackConfig)
);
