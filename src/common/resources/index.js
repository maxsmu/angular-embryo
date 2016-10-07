/**
 * @Author: maxsmu
 * @Date: 2016-10-06 18:22:38
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-06 18:31:07
 * @GitHub: https://github.com/maxsmu
*/
import genResource from 'angular-es-utils/rs-generator';

export default {
	menuResources: genResource('/menus/', false, { id: '@id' }, {
		update: { method: 'PATCH', url: '/menus/:id', params: false }
	})
};
