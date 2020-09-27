const VirtualModulesPlugin = require('webpack-virtual-modules');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const { getEntryCode } = require('./utils');

const { getPackages } = require('../utils');
const start = require('../utils/start');
const clean = require('../clean');

const packages = getPackages();
const distPath = path.join(__dirname, 'dist');
const entryPath = path.join(distPath, 'entry.tsx');

const appPath = path.join(__dirname, 'app.tsx').replace(/\\/g, '/');

const virtualModules = new VirtualModulesPlugin({
  [entryPath]: getEntryCode(appPath, packages)
});

const config = {
  devServer: {
    host: '127.0.0.1',
    port: 4001
  }
};

const webpackConfig = {
  entry: {
    index: entryPath
  },
  output: {
    path: distPath
  },
  plugins: [
    virtualModules,
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'index.ejs')
    })
  ]
};

clean();
start(config, webpackConfig);
