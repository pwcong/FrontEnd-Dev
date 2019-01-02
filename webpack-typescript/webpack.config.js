const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: distPath,
    filename: 'js/bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./'],
    inline: true,
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Webpack-TypeScript',
      template: 'src/index.ejs',
      minify: {
        collapseWhitespace: true
      }
    })
  ].concat(
    isProd
      ? [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
              warnings: false
            }
          }),
          new webpack.LoaderOptionsPlugin({
            minimize: true
          })
        ]
      : []
  )
};
