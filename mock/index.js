/**
 * @Author: maxsmu
 * @Date: 2016-10-04 16:58:23
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-04 17:07:40
 * @GitHub: https://github.com/maxsmu
*/
module.exports = {
	'/index': {
		get: (request, response) => {
			response.send('get');
		},
		post: (request, response) => {
			response.send('post');
		},
		put: (request, response) => {
			response.send('put');
		},
		delete: (request, response) => {
			response.send('delete');
		},
		patch: (request, response) => {
			response.send('patch');
		}
	}
};
