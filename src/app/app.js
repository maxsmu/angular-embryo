/**
 * @Author: maxsmu
 * @Date: 2016-10-05 22:17:11
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-06 00:10:52
 * @GitHub: https://github.com/maxsmu
*/
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
// import {Inject} from 'angular-es-utils';

// import 业务模块
import Components from '../components';

export class WebappController {
	constructor() {
		this.name = '这是一个angular项目雏形';
	}
}

export default angular
	.module('app', [
		'oc.lazyLoad',
		ngAnimate,
		ngResource,
		uiRouter,
		Components
	])
	.controller('webappController', WebappController)
	.name;
