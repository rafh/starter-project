var path = require('path');
var webpack = require('webpack');

// development variables
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

// checks if production : development
var entry = PRODUCTION
    ?   [ './src/index.js' ]
    :   [
            './src/index.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost8080'
    ];

var plugins = PRODUCTION
    ?   [
            new webpack.optimize.UglifyJsPlugin({
                // comments: true,
                // mangle: false,
                // compress: {
                //     warnings: true
                // }
            })
    ]
    :   [ new webpack.HotModuleReplacementPlugin() ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION),
    })
);

module.exports = {
    devtool: 'source-map', //add source mapping to devtools
    entry: entry,
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders:['babel-loader'],
            exclude: '/node_modules/'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loaders:['url-loader?10000&name=images/[hash.12].[ext]'],//use url loader if image is over 10k : use file loader
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    }
};
