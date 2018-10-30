const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const rootPath = path.resolve(__dirname, '..');
const distPath = path.resolve(rootPath, 'dist');

module.exports = merge(baseConfig, {
  entry: path.resolve(rootPath, 'src/entry-server.js'),

  target: 'node',

  output: {
    path: distPath,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRServerPlugin()]
});
