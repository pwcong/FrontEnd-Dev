const path = require('path');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PrerenderSPAPlugin = require('prerender-spa-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

const commonCssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: { importLoaders: 1 }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './src/app.js',
    vendors: ['@babel/polyfill', 'vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
    extensions: ['.js', '.vue']
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
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      title: 'Vue Prerendering',
      template: 'src/index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    })
  ].concat(
    isProd
      ? [
          new PrerenderSPAPlugin({
            staticDir: distPath,
            routes: ['/', '/page1', '/page2']
          })
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  )
};
