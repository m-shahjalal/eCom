const home = require('./home');
const user = require('./user');
const product = require('./product');
const order = require('./order');

const routes = [
	{
		path: '/',
		router: home,
	},
	{
		path: '/users',
		router: user,
	},
	{
		path: '/products',
		router: product,
	},
	{
		path: '/orders',
		router: order,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.router);
	});
};
