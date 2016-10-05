/**
 * @Author: maxsmu
 * @Date: 2016-10-04 15:58:31
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-05 21:47:29
 * @GitHub: https://github.com/maxsmu
*/
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config-dev');
const compiler = webpack(webpackConfig);

const mockFileUrl = './mock';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(__dirname));

app.use(WebpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	noInfo: false,
	stats: {
		colors: true,
		cached: false
	}
}));
app.use(WebpackHotMiddleware(compiler));

const routers = getMockRouters();
const router = express.Router();
routers.forEach(config => {
	if (config) {
		Object.keys(config).forEach(url => {
			Object.keys(config[url]).forEach(setting => {
				router[setting](url, config[url][setting]);
			});
		});
	}
});

app.use(router);

app.use((request, response, next) => {
	response.sendStatues(404);
	next();
});

// error
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send(err.message);
	});
}

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
	console.log(`---------前端服务器已启动---------\n\n--访问地址: http://127.0.0.1:${server.address().port}--\n`);
});

function getMockRouters() {
	const routers = [];
	fs.readdirSync(mockFileUrl).forEach(url => {
		routers.push(require(`${mockFileUrl}/${url}`));
	});
	return routers;
}

module.export = app;
