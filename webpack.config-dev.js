/**
 * @Author: maxsmu
 * @Date: 2016-10-04 19:34:23
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-08 17:29:10
 * @GitHub: https://github.com/maxsmu
*/
// webpack
const webpack = require('webpack');

// path
const path = require('path');

// create html （创建html文件）
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extract css 提取css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eslint-friendly-formatter
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

// CopyWebpackPlugin 拷贝资源
const CopyWebpackPlugin = require('copy-webpack-plugin');

// autoprefixer
const autoprefixer = require('autoprefixer');

const loaders = [
	{
		test: /\.js$/,
		loaders: ['babel'],
		include: path.join(__dirname, 'src')
	},
	{
		test: /\.tpl\.html$/,
		loader: 'html',
		query: { interpolate: true },
		exclude: /(node_modules|bower_components)/,
		include: path.join(__dirname, 'src')
	},
	{
		test: /\.url\.html$/,
		loader: 'file?name=[path][name]-[hash:8].[ext]',
		exclude: /(node_modules|bower_components)/,
		include: path.join(__dirname, 'src')
	},
	{
		test: /\.(sc|c)ss$/,
		loader: ExtractTextPlugin.extract('style', 'css?-minimize!postcss!resolve-url!sass?sourceMap'),
		exclude: /(node_modules|bower_components)/
	},
	{
		test: /\.(jpe?g|png|gif)$/i,
		loaders: [
			'file?hash=sha512&digest=hex&name=[hash:8].[ext]',
			'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
		]
	},
	{
		test: /\.(woff|woff2)(\?t=\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
	},
	{
		test: /\.ttf(\?t=\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
	},
	{
		test: /\.eot(\?t=\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
	},
	{
		test: /\.svg(\?t=\d+)?$/,
		loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
	}
];

module.exports = {
	devtool: 'source-map',
	entry: {
		webapp: [
			'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
			'./src/app/app.js'
		]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name]-[hash].js',
		publicPath: '/' // hot loader publish dir
	},
	externals: {
		// 'angular': 'angular',
		// 'angular-resource': '\'ngResource\'',
		// 'angular-ui-router': '\'ui.router\''
	},
	resolve: {
		// 扩展名：在解析一个文件时，将会尝试附加这些文件扩展名。
		extensions: ['', '.js', '.scss']
	},
	eslint: {
		configFile: '.eslintrc',
		emitWarning: true,
		emitError: true,
		formatter: eslintFriendlyFormatter
	},
	postcss: [autoprefixer({ browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7'] })],
	plugins: [
		// 拷贝静态资源
		new CopyWebpackPlugin([
			{
				from: __dirname + '/src/assets/lib',
				to: __dirname + '/build/assets/lib'
			},
			{
				from: __dirname + '/src/assets/images/static',
				to: __dirname + '/build/assets/images/static'
			}
		]),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			title: 'angular1.X+ES2015',
			inject: true
		}),
		// 分离CSS和JS文件
		new ExtractTextPlugin('[name]-[hash].css'),
		// 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				include: [path.join(__dirname, 'src')]
			}
		],
		loaders
	}
};
