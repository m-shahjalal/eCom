const User = require('../models/User');
const { verifyToken } = require('../utils/token');

module.exports = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const { email } = await verifyToken(token);
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: 'Please login first' });
		} else {
			req.user = user;
			return next();
		}
	} catch (error) {
		next(error);
	}
};
