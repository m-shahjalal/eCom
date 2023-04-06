const { body, validationResult } = require('express-validator');

const loginValidator = [
	body('email')
	 	.isEmail()
		.withMessage('Give right email address')
		.isLength({ min: 5 })
		.withMessage('Too short email')
		.trim()
		.toLowerCase(),
	body('password')
		.isLength({ min: 5, max: 15 })
		.withMessage('Password is required'),

	(req, res, next) => {
		const errorValidation = validationResult(req);
		if (!errorValidation.isEmpty()) {
			return res.status(400).json({error: errorValidation.array()[0].msg});
		}
		return next();
	},
];

module.exports = loginValidator;
