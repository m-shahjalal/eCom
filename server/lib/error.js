const logger = require('../utils/logger');

module.exports = (app) => {
	app.use((req, res, next) => {
		const error = new Error(`Not Found - ${req.originalUrl}`);
		res.status(404);
		next(error);
	});

	app.use((err, _req, res, _next) => {
		const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
		res.status(statusCode);
		res.json({
			message: err.message,
			stack: process.env.NODE_ENV === 'production' ? null : err.stack,
		});
	});
};
