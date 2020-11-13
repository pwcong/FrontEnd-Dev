const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const { rootPath } = require('../utils');

module.exports = {
  entry: {},
  output: {},
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.join(rootPath, 'tsconfig.json'),
          transpileOnly: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(zip|rar|7z)$/,
        loader: 'file-loader',
        options: {
          name: 'archive/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
