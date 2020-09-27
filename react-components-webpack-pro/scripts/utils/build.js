const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackProdConfig = require('../config/webpack.prod.conf');

module.exports = (config, webpackConfig, baseWebpackConfig, done) => {
  config = Object.assign({}, config);

  const getWebpackConfig = (wc) =>
    merge(baseWebpackConfig || webpackProdConfig, wc, {});

  const targetWebpackConfigs = [];
  if (Array.isArray(webpackConfig)) {
    webpackConfig.forEach((wc) =>
      targetWebpackConfigs.push(getWebpackConfig(wc))
    );
  } else {
    targetWebpackConfigs.push(getWebpackConfig(webpackConfig));
  }

  let idx = 0,
    len = targetWebpackConfigs.length;

  const doWebpack = () => {
    const conf = targetWebpackConfigs[idx];
    webpack(conf).run((err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(
        stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
        })
      );

      done && done(conf);

      if (idx < len - 1) {
        idx += 1;
        doWebpack();
      }
    });
  };

  doWebpack();
};
