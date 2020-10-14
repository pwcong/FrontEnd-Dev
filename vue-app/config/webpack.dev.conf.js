const webpack = require('webpack');
const {
  baseWebpackConfig,
  buildCssLoadersConfig,
} = require('./webpack.base.conf');
const { merge } = require('webpack-merge');

module.exports = merge(baseWebpackConfig, buildCssLoadersConfig(), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    publicPath: '/',
    hot: true,
    disableHostCheck: true,
    quiet: true,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
