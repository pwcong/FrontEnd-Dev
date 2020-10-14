const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('../package.json');
const webpackProdConfig = require('../config/webpack.prod.conf');
const { prodConfig, rootPath, distPath, environment } = require('./config');

function build(config, webpackConfig) {
  config = Object.assign({}, config);

  webpackConfig = merge(webpackProdConfig, webpackConfig);

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      return;
    }

    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  });
}

function main() {
  const config = {};
  const webpackConfig = {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(rootPath, 'static'),
            to: path.join(distPath, 'static'),
          },
        ],
      }),
      new ZipWebpackPlugin({
        path: distPath,
        filename: `${pkg.name}-${pkg.version}-${environment}.zip`,
      }),
    ],
  };
  build(config, merge(prodConfig, webpackConfig));
}

main();
