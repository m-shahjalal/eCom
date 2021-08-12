const jwt = require('jsonwebtoken');

const auth = {};

const tokens = {
	secret: process.env.SECRET_KEY,
	validity: process.env.TOKEN_EXPIRE,
};

auth.generateToken = (payload) => {
	//creating the access token
	const accessToken = jwt.sign(payload, tokens.secret, {
		algorithm: 'HS256',
		expiresIn: tokens.validity,
	});
	return accessToken;
};

auth.verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			tokens.secret,
			{ algorithms: 'HS256' },
			(err, data) => {
				if (err) {
					return reject(auth.errorHandler(err));
				}
				if (data) {
					return resolve(data);
				}
			}
		);
	});
};

auth.errorHandler = (e) => {
	let err = {
		error: '',
		status: '',
	};

	if (e.name === 'JsonWebTokenError') {
		err.error = 'invalid token, please provide a accurate token';
		err.status = 403;
	} else if (e.name === 'TokenExpiredError') {
		err.error = 'token expired, please login again';
		err.status = 403;
	} else if (e.name === 'NotBeforeError') {
		err.error = 'jwt not active';
		err.status = 409;
	}
	return err;
};

module.exports = auth;
