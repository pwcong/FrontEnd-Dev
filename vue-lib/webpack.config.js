const path = require('path');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'env'
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [require('postcss-cssnext')],
                    esModule: true
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'imgs/[name].[ext]?[hash]',
                }
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {

    module.exports.entry = path.resolve(__dirname, './src/index.js');

    module.exports.output = {
        path: path.resolve(__dirname, './lib'),
        filename: 'vue-lib.js',
        library: 'vue-lib',
        libraryTarget: 'umd'
    };

    module.exports.externals = ['vue'];

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

    module.exports.entry = path.resolve(__dirname, './example/app.js');

    module.exports.output = {
        filename: 'bundle.js'
    };

    module.exports.devtool = 'inline-source-map';

    module.exports.devServer = {
        historyApiFallback: true,
        port: 3000,
        contentBase: [
            './example'
        ],
        inline: true,
        publicPath: '/'
    };
}