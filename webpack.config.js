var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

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
            'webpack-dev-server/client?http://localhost:8080',
    ];

const plugins = PRODUCTION
    ?   [
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('style-[contenthash:10].css'),
            new HTMLWebpackPlugin({
                template: 'index-template.html'
            })
        ]
    :   [
            new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer(), ] } }),
            new webpack.HotModuleReplacementPlugin({
                // devServer: {
                //     hot: true
                // }
            }),
			new webpack.ProvidePlugin({
	            $: 'jquery',
	            jQuery: 'jquery'
	        })
        ];

plugins.push(
    new webpack.DefinePlugin({
		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
		PRODUCTION: JSON.stringify(PRODUCTION)
	})
);

// add class name depending on enviroment PROD | DEV
const cssIndentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

// inject into head in DEV and create CSS file in PROD
const cssLoader = PRODUCTION
    ?   ExtractTextPlugin.extract({
            use: 'css-loader?minimize&localIdentName=' + cssIndentifier
        })
    :   ['style-loader','css-loader?localIdentName=' + cssIndentifier, 'sass-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () { return [ autoprefixer ] }
                }
            }
        ];

module.exports = {
    devtool: 'source-map', //add source mapping to devtools
    entry: entry,
    plugins: plugins,
    externals: {
        // jquery: 'jQuery' //jquery is external and availabe at the global variable jQuery
    },
    module: {
        rules: [{
            test: /\.js$/,
            use:['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            use:['url-loader?10000&name=images/[hash.12].[ext]'],//use url loader if image is over 10k : use file loader
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: cssLoader,
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    }
};

devServer: {
	hot: true
}
