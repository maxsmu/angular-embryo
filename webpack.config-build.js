/**
 * @Author: maxsmu
 * @Date: 2016-10-05 23:36:44
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-05 23:47:54
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

// optimize-css-assets-webpack-plugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//  cssnano common  opts
var cssNanoCommonOpts = {
	discardComments: { removeAll: true },
	discardDuplicates: true,
	discardOverridden: true,
	discardUnused: true,
	minifyGradients: true
};

// cssnano
const cssnano = require('cssnano');

// clean-webpack-plugin 清空目录
const CleanPlugin = require('clean-webpack-plugin');

// CopyWebpackPlugin 拷贝资源
const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-friendly-formatter
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

// autoprefixer
const autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'cheap-source-map',
	// 打包目录上下文
	context: path.join(__dirname, 'src'),
	entry: {
		'app': './app/app.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]-[hash:8].min.js',
		publicPath: '/dist/'
	},
	externals: {
		// 'angular': 'angular',
		// 'angular-resource': '\'ngResource\'',
		// 'angular-ui-router': '\'ui.router\'',
		// 'ccms-components': '\'ccms.components\''
	},
	resolve: {
		extensions: ['', '.js']
	},
	eslint: {
		configFile: '.eslintrc',
		emitWarning: true,
		emitError: true,
		formatter: eslintFriendlyFormatter
	},
	postcss: [autoprefixer({ browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7'] })],
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new CleanPlugin(['dist']),
		new CopyWebpackPlugin([
			{
				from: __dirname + '/src/assets/lib',
				to: __dirname + '/dist/assets/lib'
			},
			{
				from: __dirname + '/node_modules/oclazyload/dist/ocLazyLoad.min.js',
				to: __dirname + '/dist/assets/lib/ocLazyLoad.min.js'
			},
			{
				from: __dirname + '/src/assets/images/static',
				to: __dirname + '/dist/assets/images/static'
			}
		]),
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: './index.html',
			inject: false
		}),
		new ExtractTextPlugin('[name]-[contenthash:8].css'),

		// 处理extract出来的css
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: cssnano,
			cssProcessorOptions: Object.assign({
				core: false
			}, cssNanoCommonOpts),
			canPrint: true
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: cssnano,
			cssProcessorOptions: cssNanoCommonOpts,
			canPrint: true
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
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
		loaders: [
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
				include: path.join(__dirname, 'src/app')
			},
			{
				test: /\.(sc|c)ss$/,
				loader: ExtractTextPlugin.extract('style', 'css?-minimize!postcss!resolve-url!sass?sourceMap'),
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[path][name]-[hash:8].[ext]',
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
		]
	}
};
