const path = require('path');
const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const srcDir = path.join(__dirname, 'src');
const subDirs = klawSync(srcDir, {
  nofile: true
});

let entry = null;
let pages = null;

if (isProd) {
  entry = {};
  pages = [];

  function addPage(pageDir) {
    let appFilePath = path.join(pageDir, 'index.js');
    let tplFilePath = path.join(pageDir, 'tpl.ejs');

    if (fs.existsSync(appFilePath) && fs.existsSync(tplFilePath)) {
      let name = path.relative(srcDir, pageDir);
      if (name) {
        if (path.sep === '/') {
          name = name.replace(/\//g, '_');
        } else {
          name = name.replace(/\\/g, '_');
        }
      } else {
        name = 'index';
      }

      pages.push({
        name: name,
        entry: appFilePath,
        template: tplFilePath
      });
    }
  }

  addPage(srcDir);

  subDirs.forEach(function(page, _) {
    addPage(page.path);
  });

  if (pages.length < 1) {
    console.log('lack of entry.');
    process.exit(0);
  }

  pages.forEach(function(page, _) {
    entry[page.name] = page.entry;
  });
} else if (process.env.ENTRY) {
  let appFilePath = path.join(srcDir, process.env.ENTRY, 'index.js');

  if (fs.existsSync(appFilePath)) {
    entry = {
      index: appFilePath
    };
  } else {
    console.log(`entry "${appFilePath}" not found.`);
    process.exit(0);
  }
} else {
  console.log('lack of entry.');
  process.exit(0);
}

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
  entry: Object.assign({}, entry, {
    vendors: ['@babel/polyfill', 'vue']
  }),
  output: {
    path: distPath,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    })
  ]
    .concat(
      pages && pages.length > 0
        ? pages.map(
            page =>
              new HTMLWebpackPlugin({
                filename: page.name + '.html',
                template: page.template,
                chunks: ['vendors', page.name]
              })
          )
        : [
            new HTMLWebpackPlugin({
              title: 'Vue MultiPage',
              template: 'index.ejs'
            })
          ]
    )
    .concat(isProd ? [] : [new webpack.HotModuleReplacementPlugin()])
};
