/**
 * @Author: maxsmu
 * @Date: 2016-10-05 22:17:11
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-08 17:28:24
 * @GitHub: https://github.com/maxsmu
*/
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
// import {Inject} from 'angular-es-utils';

// import 公共模块
import Components from '../components';
import projectRouter from '../common/project-router';

export class WebappController {
	constructor() {
		this.name = '这是一个angular项目雏形';
		console.log(projectRouter);
	}
}

export default angular
	.module('app', [
		projectRouter,
		ngAnimate,
		ngResource,
		uiRouter,
		Components
	])
	.controller('webappController', WebappController)
	.name;
