const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, './dist');

const externals = {
  'es5-shim.min.js': 'node_modules/es5-shim/es5-shim.min.js',
  'es5-sham.min.js': 'node_modules/es5-shim/es5-sham.min.js',
  'console-polyfill.js': 'node_modules/console-polyfill/index.js',
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    path: distPath,
    filename: 'js/bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true,
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          ie8: true,
        },
      }),
    ],
  },
  plugins: [
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      Object.keys(externals).map((k) => ({
        from: externals[k],
        to: path.join(distPath, 'libs', k),
      }))
    ),
    new HTMLWebpackPlugin({
      title: 'Webpack-TypeScript-IE8',
      template: 'src/index.ejs',
    }),
    new HtmlWebpackTagsPlugin({
      tags: Object.keys(externals).map((k) => 'libs/' + k),
      append: false,
    }),
  ].concat(isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
};
