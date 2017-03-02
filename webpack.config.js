var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
// var autoprefixer = require('autoprefixer');

// development variables
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

// checks if production : development
const entry = PRODUCTION
    ?   [
            './src/index.js'
        ]
    :   [
            './src/index.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost8080',
    ];

const plugins = PRODUCTION
    ?   [
            new webpack.optimize.UglifyJsPlugin(),
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
    ?   ExtractTextPlugin.extract({
            loader: 'css-loader?minimize&localIdentName=' + cssIndentifier
        })
    :   ['style-loader', 'css-loader?localIdentName=' + cssIndentifier];

module.exports = {
    devtool: 'source-map', //add source mapping to devtools
    entry: entry,
    plugins: plugins,
    externals: {
        jquery: 'jQuery' //jquery is external and availabe at the global variable jQuery
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders:['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loaders:['url-loader?10000&name=images/[hash.12].[ext]'],//use url loader if image is over 10k : use file loader
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: cssLoader,
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    }
};
