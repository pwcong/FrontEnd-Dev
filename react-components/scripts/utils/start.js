const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require('../config/webpack.dev.conf');

const baseConfig = {
  devServer: {
    host: '127.0.0.1',
    port: 4000
  }
};

module.exports = (config, webpackConfig) => {
  config = Object.assign(baseConfig, config);

  webpackConfig = merge(webpackDevConfig, webpackConfig, {
    devServer: config.devServer || {}
  });

  webpackDevServer.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer
  );
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, webpackConfig.devServer);

  const { host, port } = webpackConfig.devServer;

  server.listen(port, host, () => {
    console.log(`Your application is running here: http://${host}:${port}`);
  });
};
