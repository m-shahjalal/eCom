const token = require('../utils/token');
const User = require('../models/User');
const crypto = require('../utils/crypto');

const user = {};

user.getAllUsers = async (_req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
};

user.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const hashed = await crypto.genPassword(password);
		const user = await User.create({ name, email, password: hashed });
		const jwt = token.generateToken({ email: user.email });
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			result: true,
			token: jwt,
			isLoggedIn: true,
		});
	} catch (error) {
		next(error);
	}
};

user.login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const match = await crypto.comperePassword(password, user.password);
			if (match) {
				const jwt = token.generateToken({ email: user.email });
				res.json({
					id: user._id,
					name: user.name,
					email: user.email,
					token: jwt,
					isLoggedIn: true,
				});
			} else {
				throw new Error('something went wrong');
			}
		} else {
			res.json({ message: 'no user found' });
		}
	} catch (e) {
		next(e);
	}
};

user.checkLogin = async (req, res, next) => {
	const { jwt } = req.params;
	try {
		const data = await token.verifyToken(jwt);
		const user = await User.findOne({ email: data.email });
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			token: jwt,
			isLoggedIn: true,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = user;
