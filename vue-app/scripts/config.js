const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const rootPath = (exports.rootPath = path.join(__dirname, '..'));
const srcPath = (exports.srcPath = path.join(rootPath, 'src'));
const distPath = (exports.distPath = path.join(rootPath, 'dist'));

let environment = 'development';
if (process.env.NODE_ENV === 'production') {
  environment = process.env.BUILD_ENV || 'test';
}

exports.environment = environment;

const baseConfig = (exports.baseConfig = {
  entry: {
    index: path.join(srcPath, 'index.js'),
  },
  output: {
    path: distPath,
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      ENVIRONMENT: environment,
    }),
    new HTMLWebpackPlugin({
      title: 'Vue App',
      template: path.join(srcPath, 'index.ejs'),
      favicon: path.join(rootPath, 'static/favicon.ico'),
    }),
  ],
});

exports.devConfig = merge(baseConfig, {});
exports.prodConfig = merge(baseConfig, {});
