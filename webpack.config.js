var path = require('path');
var webpack = require('webpack');
var ExtratTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

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
            }),
            new ExtratTextPlugin('style-[contenthash:10].css'),
            new HTMLWebpackPlugin({
                template: 'index-template.html'
            })
    ]
    :   [ new webpack.HotModuleReplacementPlugin() ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION),
    })
);

// add class name depending on enviroment PROD | DEV
const cssIndentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

// inject into head in DEV and create CSS file in PROD
const cssLoader = PRODUCTION
    ?   ExtratTextPlugin.extract({
            loader: 'css-loader?localIdentName=' + cssIndentifier
        })
    :   ['style-loader', 'css-loader?localIdentName=' + cssIndentifier ];

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
        },
        {
            test: /\.css$/,
            loaders: cssLoader,
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    }
};
