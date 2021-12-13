const mongoose = require('mongoose');
const logger = require('../utils/logger');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://${username}:${password}@cluster0.1gsip.mongodb.net/ecom?retryWrites=true&w=majority`;

const db = async (app) => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		logger.info('db connection established');
		return app;
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = db;
