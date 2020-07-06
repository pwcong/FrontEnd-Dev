const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, './dist');

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
  plugins: [
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Webpack-TypeScript',
      template: 'src/index.ejs',
    }),
  ].concat(isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
};
