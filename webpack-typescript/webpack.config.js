const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.[hash].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
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
            title: 'Webpack-TypeScript',
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