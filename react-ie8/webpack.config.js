const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const distPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const isIE8 = process.env.IE8 === 'true';
const externals = isIE8
  ? {
      'es5-polyfill.min.js': 'node_modules/es5-polyfill/dist/polyfill.min.js',
    }
  : {};

const commonCssLoaders = [
  isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      }
    : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [...commonCssLoaders, 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: commonCssLoaders,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: Object.assign(
      { '@': path.resolve(__dirname, 'src') },
      isIE8
        ? {
            react: 'nervjs',
            'react-dom': 'nervjs',
          }
        : {}
    ),
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
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
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true,
    quiet: true,
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      Object.keys(externals).map((k) => ({
        from: externals[k],
        to: path.join(distPath, 'libs', k),
      }))
    ),
    new HTMLWebpackPlugin({
      title: 'React-IE8',
      template: 'src/index.ejs',
    }),
    new HtmlWebpackTagsPlugin({
      tags: Object.keys(externals).map((k) => 'libs/' + k),
      append: false,
    }),
  ].concat(
    isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true,
          }),
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  ),
};
