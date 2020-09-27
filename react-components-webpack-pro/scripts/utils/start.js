const merge = require('webpack-merge');
const portfinder = require('portfinder');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require('../config/webpack.dev.conf');

const BASE_PORT = 3000;

portfinder.basePort = BASE_PORT;

const baseConfig = {
  devServer: {
    host: '127.0.0.1',
  },
};

module.exports = (config, webpackConfig) => {
  config = Object.assign(baseConfig, config);

  webpackConfig = merge(webpackDevConfig, webpackConfig, {
    devServer: config.devServer || {},
  });

  webpackDevServer.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer
  );

  portfinder.getPort((err, port) => {
    if (!!port) {
      port = BASE_PORT;
    }
    webpackConfig.devServer.port = port;

    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler, webpackConfig.devServer);

    const { host } = webpackConfig.devServer;

    server.listen(port, host, () => {
      console.log(`Your application is running here: http://${host}:${port}`);
    });
  });
};
