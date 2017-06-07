const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const debug = process.env.NODE_ENV === "development";
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
    disable: debug
});

module.exports = {
	context: path.join(__dirname, "client"),
	entry: [
		"babel-polyfill",
      	'react-hot-loader/patch',
		"whatwg-fetch",
		'./index.js', 
		'./main.scss'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/public')
	},

	// devtool: debug ? "inline-sourcemap" : false,
	devtool: "inline-sourcemap",

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react'],
						plugins: [
							'react-hot-loader/babel',
							'transform-async-to-generator', 
							'transform-decorators-legacy', 
							'transform-class-properties',
							['import', {
								"libraryName": "antd"
							}]
						]
					}
				}
			},
			{
	            test: /\.s?css$/,
	            use: extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }],
	                // use style-loader in development
	                fallback: "style-loader"
	            })
	        }
		]
	},

	plugins: [
		//new webpack.HotModuleReplacementPlugin(), // Enable HMR
		extractSass
	],
	
	devServer: {
		//hot: true,
		publicPath: '/',
		contentBase: './dist'
	},
};