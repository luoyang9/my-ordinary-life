var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var debug = process.env.NODE_ENV === "development";

var extractSass = new ExtractTextPlugin({
    filename: "main.css",
    disable: debug
});

module.exports = {
	context: path.join(__dirname, "client"),
	entry: [
		'./index.js', 
		'./main.scss'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	devtool: debug ? "inline-sourcemap" : false,

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
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
		extractSass
	],
	
	devServer: {
		publicPath: '/',
		contentBase: './dist'
	},
};