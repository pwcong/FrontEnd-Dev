const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.[hash].js'
    },
    module: {
        rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        port: 3000,
        contentBase: [
            './'
        ],
        hot: true,
        inline: true,
        publicPath: '/'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Webpack-Babel',
            template: 'index.ejs',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {

    module.exports.devtool = 'source-map';

    module.exports.plugins = (module.exports.plugins || []).concat([

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
    ]);
}