const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

module.exports = merge(baseConfig, {
  entry: {
    index: './src/entry-client.js',
    vendors: ['babel-polyfill', 'vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(distPath),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      title: 'Vue Family',
      template: 'src/index.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ].concat(
    isProd
      ? [
          // 此插件在输出目录中
          // 生成 `vue-ssr-client-manifest.json`。
          new VueSSRClientPlugin()
        ]
      : []
  )
});
