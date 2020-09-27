const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');

const { getEntryCode } = require('./utils');
const { getPackages, rootPath } = require('../utils');
const build = require('../utils/build');
const clean = require('../clean');

const packages = getPackages();
const distPath = path.join(rootPath, 'docs');
const entryPath = path.join(distPath, 'entry.tsx');

const appPath = path.join(__dirname, 'app.tsx').replace(/\\/g, '/');

const virtualModules = new VirtualModulesPlugin({
  [entryPath]: getEntryCode(appPath, packages)
});

const config = {};

const webpackConfig = {
  entry: {
    index: entryPath
  },
  output: {
    path: distPath
  },
  plugins: [
    virtualModules,
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'index.ejs')
    })
  ]
};

clean();
build(config, webpackConfig);
