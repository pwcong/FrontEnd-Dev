const portfinder = require('portfinder');
const address = require('address');
const chalk = require('chalk');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../config/webpack.dev.conf');
const { devConfig, rootPath } = require('./config');

function start(config, webpackConfig) {
  config = Object.assign({}, config);

  webpackConfig = merge(webpackDevConfig, webpackConfig, {
    devServer: config.devServer || {},
  });

  webpackDevServer.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer
  );
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, webpackConfig.devServer);

  const { host, port } = webpackConfig.devServer;

  server.listen(port, host, (err) => {
    if (!err) {
      console.log(
        chalk.green(
          '\n> Your application is running here:\n' +
            `\thttp://0.0.0.0:${port}/\n` +
            `\thttp://127.0.0.1:${port}\n` +
            `\thttp://${address.ip()}:${port}/`
        )
      );
    }
  });
}

function main() {
  portfinder.getPort(
    {
      port: 3000,
    },
    (err, port) => {
      if (!!err) {
        console.log(chalk.red('Fail to get port'));
        return;
      }
      const config = {
        devServer: {
          contentBase: [rootPath],
          host: '0.0.0.0',
          port: port,
          proxy: {},
        },
      };
      const webpackConfig = {};

      start(config, merge(devConfig, webpackConfig));
    }
  );
}

main();
