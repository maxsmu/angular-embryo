/**
 * @Author: maxsmu
 * @Date: 2016-10-04 16:58:23
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-10-04 16:58:23
 * @GitHub: https://github.com/maxsmu
*/
module.exports = {
	'/index/:id': {
		get: (request, response) => {
			response.send({ name: '张三', age: 32 });
		},
		post: () => console.log(1),
		put: () => console.log(1),
		delete: () => console.log(1)
	},
	'/menu': {
		get: (request, response) => {
			response.send({ name: '张三', age: 32 });
		}
	}
};
