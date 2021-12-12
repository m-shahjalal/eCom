const token = require('../utils/token');
const User = require('../models/User');
const Profile = require('../models/Profile');
const crypto = require('../utils/crypto');
const fs = require('fs');
const cloudinary = require('../lib/cloudinary');

const user = {};

user.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const hashed = await crypto.genPassword(password);
		const user = await User.create({ name, email, password: hashed });
		res.status(201).json({
			id: user._id,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		next(error.message);
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
				const admin = user.roles?.find((item) => item === 'admin');

				res.json({
					id: user._id,
					name: user.name,
					email: user.email,
					token: jwt,
					isLoggedIn: true,
					admin: Boolean(admin),
				});
			} else {
				res.status(403).json({ error: 'credential not match' });
			}
		} else {
			res.status(403).json({ error: 'credential not match' });
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
		const admin = user.roles?.find((item) => item === 'admin');
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			token: jwt,
			isLoggedIn: true,
			admin: Boolean(admin),
		});
	} catch (error) {
		next(error.message);
	}
};

user.getUserDetails = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({ _id: id })
			.populate('profile')
			.select('-password');

		if (user) {
			if (!user.profile) {
				res.status(200).json({ user, profile: false });
			} else {
				res.status(200).json(user);
			}
		}
	} catch (error) {
		console.error(error);
		next(error.message);
	}
};

user.editUser = async (req, res, next) => {
	const { name, tagline, contact, address, city, country, zipCode } =
		req.body;
	try {
		let image = '';
		if (req.file) {
			const { path } = req.file;
			const uploader = await cloudinary.cloudUpload(path, 'ecom/avatar');
			image = uploader.url;
			fs.unlinkSync(path);
		}

		const user = await User.findById(req.user._id);
		if (user.profile) {
			const profile = await Profile.findById(user.profile);
			if (name) {
				profile.name = name;
				user.name = name;
				await user.save();
			}
			if (tagline) profile.tagline = tagline;
			if (contact) profile.contact = contact;
			if (req.file && image) profile.thumb = image;
			if (address) profile.address.line = address;
			if (city) profile.address.city = city;
			if (country) profile.address.country = country;
			if (zipCode) profile.address.zipcode = zipCode;
			const result = await profile.save();
			res.status(201).json({ success: true, user: result });
		} else {
			const profile = await Profile.create({
				user: user._id,
				name,
				tagline,
				contact,
				thumb: image,
				email: user.email,
				address: {
					line: address,
					city,
					country,
					zipcode: zipCode,
				},
			});
			user.profile = profile._id;
			user.name = profile.name;
			const result = await user.save();
			res.status(201).json({ success: true, user: result });
		}
	} catch (error) {
		console.error(error);
		next(error.message);
	}
};
module.exports = user;
