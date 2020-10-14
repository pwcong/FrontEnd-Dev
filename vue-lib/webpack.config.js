const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

const isProd = process.env.NODE_ENV === 'production';

const commonCssLoaders = [
  {
    loader: 'style-loader',
  },
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue'],
  },

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./example'],
    inline: true,
    publicPath: '/',
    hot: true,
    quiet: true,
  },

  plugins: [
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};

if (isProd) {
  module.exports.entry = path.resolve(__dirname, './src/index.js');
  module.exports.output = {
    path: path.resolve(__dirname, './lib'),
    filename: 'vue-lib.js',
    library: 'vue-lib',
    libraryTarget: 'umd',
  };
  module.exports.externals = ['vue'];
} else {
  module.exports.entry = path.resolve(__dirname, './example/index.js');
  module.exports.output = {
    filename: 'bundle.js',
  };
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
}
