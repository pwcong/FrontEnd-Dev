const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');

module.exports = {
  entry: {
    index: path.join(rootPath, 'src/index.tsx')
  },
  output: {
    path: distPath
  },
  resolve: {
    alias: {
      '@': path.join(rootPath, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Example',
      template: path.join(rootPath, 'src/index.ejs')
    })
  ]
};
