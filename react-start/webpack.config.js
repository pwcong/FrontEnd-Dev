const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

const commonCssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [...commonCssLoaders, 'sass-loader']
      },
      {
        test: /\.css$/,
        use: commonCssLoaders
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
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
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'React Start',
      template: 'src/index.ejs'
    })
  ].concat(
    isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true
          })
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  )
};
