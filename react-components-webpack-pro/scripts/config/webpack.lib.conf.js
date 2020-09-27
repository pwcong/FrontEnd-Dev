const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.base.conf');

const commonCssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [require('postcss-preset-env')()],
    },
  },
];

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'index.min.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [...commonCssLoaders, 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: commonCssLoaders,
      },
    ],
  },
  externals: ['react', 'react-dom'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.min.css',
      allChunks: true,
    }),
  ],
});
