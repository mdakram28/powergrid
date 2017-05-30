var path = require('path');
var webpack = require('webpack');

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin =
    new Webpack_isomorphic_tools_plugin(
        require('./webpack-isomorphic-tools-configuration')
    ).development();

module.exports = {
    entry: path.join(__dirname, 'frontend', 'app.js'),
    output: {
        path: path.join(__dirname, './public/build'),
        filename: 'bundle.js',
    },
    externals : {
        // 'plotly' : 'Plotly'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
			}, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
			}, {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?prefix=font/&limit=5000'
			}, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			}, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}, {
                test: /\.json$/,
                loader: 'json-loader'
			}, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'
			}, {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loader: 'url-loader?limit=10240'
			}
		],
    },
    plugins: [
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
	],
    resolve: {
        alias: {
            // bind version of jquery-ui
            //'jquery-ui': 'jquery-ui/jquery-ui.js',
            // bind to modules;
            'modules': path.join(__dirname, 'node_modules'),
        }
    }
}
