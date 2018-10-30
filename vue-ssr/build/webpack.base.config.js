const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const rootPath = path.resolve(__dirname, '..');

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

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-1']
        }
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
      '@': path.resolve(rootPath, 'src')
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
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
