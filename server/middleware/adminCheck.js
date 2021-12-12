const User = require('../models/User');
const { verifyToken } = require('../utils/token');

module.exports = async (req, res, next) => {
	const user = req.user;
	const admin = user?.roles[0] === 'admin' ? true : false;
	if (admin) {
		req.admin = true;
		return next();
	} else {
		return res
			.status(401)
			.json({ message: 'You are not authorized to view' });
	}
};
