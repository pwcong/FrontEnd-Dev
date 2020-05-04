const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'lib');

const commonCssLoaders = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: ['./example'],
    inline: true,
    publicPath: '/',
    hot: true
  },
  plugins: [new CleanWebpackPlugin()]
};

if (isProd) {
  module.exports.entry = path.resolve(__dirname, './src/index.js');
  module.exports.output = {
    path: distPath,
    filename: 'react-lib.js',
    library: 'react-lib',
    libraryTarget: 'umd'
  };
  module.exports.externals = ['react'];
} else {
  module.exports.entry = path.resolve(__dirname, './example/app.jsx');
  module.exports.plugins = [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
  module.exports.output = {
    filename: 'bundle.js'
  };
}
