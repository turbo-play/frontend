const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'app.css',
});

const {
	imageLoaderConfiguration,
	babelLoaderConfiguration,
	sassLoaderConfiguration,
} = require('./loaderConfiguration')(extractSass);

module.exports = {
	// ...the rest of your config

	entry: [path.resolve(__dirname, '../index.web.js'), path.resolve(__dirname, '../src/sass/app.scss')],
	module: {
		rules: [
			babelLoaderConfiguration,
			imageLoaderConfiguration,
			sassLoaderConfiguration,
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'url-loader',
			},
		],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
	},
	devtool: 'inline-source-map',
	plugins: [
		extractSass,
		// `process.env.NODE_ENV === 'production'` must be `true` for production
		// builds to eliminate development checks and reduce build size. You may
		// wish to include additional optimizations.
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
	],

	resolve: {
		extensions: ['.web.js', '.web.jsx', '.js', '.jsx'],
	},
};
