const path = require('path');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        'env'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        port: 3000,
        contentBase: [
            './example'
        ],
        inline: true,
        publicPath: '/'
    }
}

if (process.env.NODE_ENV === 'production') {

    module.exports.entry = path.resolve(__dirname, './src/index.js');

    module.exports.output = {
        path: path.resolve(__dirname, './lib'),
        filename: 'react-lib.js',
        library: 'react-lib',
        libraryTarget: 'umd'
    };

    module.exports.externals = ['react'];

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

} else {

    module.exports.entry = path.resolve(__dirname, './example/app.jsx');

    module.exports.output = {
        filename: 'bundle.js'
    };

}