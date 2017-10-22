const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].[hash].css',
    allChunks: true,
    disable: !process.env.NODE_ENV === "production"
});

module.exports = {
    entry: {
        index: './src/index.jsx',
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        'env',
                        'stage-1'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-cssnext')
                                ]
                            }
                        }
                    ],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'imgs/[name].[ext]?[hash]',
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
            title: 'React SPA',
            template: 'index.ejs',
            minify: {
                collapseWhitespace: true
            }
        }),
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js'
        })
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