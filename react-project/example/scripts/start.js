const start = require('../../scripts/start');
const merge = require('webpack-merge');
const baseConfig = require('./base');
const webpackDevConfig = require('../config/webpack.dev.conf');

const config = {};

const webpackConfig = {};

start(
  Object.assign(baseConfig, config),
  merge(webpackDevConfig, webpackConfig)
);
