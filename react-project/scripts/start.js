const baseConfig = require('./base');
const webpackDevConfig = require('../config/webpack.dev.conf');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

module.exports = function(config, webpackConfig) {
  config = Object.assign(baseConfig, config);

  webpackConfig = merge(webpackDevConfig, webpackConfig, {
    devServer: config.devServer || {}
  });

  webpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, webpackConfig.devServer);

  const { host, port } = webpackConfig.devServer;

  server.listen(port, host, () => {
    console.log(`Your application is running here: http://${host}:${port}`);
  });
};
