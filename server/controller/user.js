const token = require('../utils/token');
const User = require('../models/User');
const Profile = require('../models/Profile');
const crypto = require('../utils/crypto');
const fs = require('fs');
const cloudinary = require('../lib/cloudinary');

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
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			token: jwt,
			isLoggedIn: true,
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
	const { id } = req.params;
	const { name, tagline, contact, address, city, country, zipCode } =
		req.body;
	try {
		let image = '';
		if (req.file) {
			const uploader = async (path) =>
				await cloudinary(path, 'ecom/avatar');
			const { path } = req.file;
			const { url } = await uploader(path);
			image = url;
			fs.unlinkSync(path);
		}

		const user = await User.findById(req.user._id);
		if (user.profile) {
			const profile = await Profile.findById(user.profile);
			if (name) profile.name = name;
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
				thumb: url,
				email: user.email,
				address: {
					line: address,
					city,
					country,
					zipcode: zipCode,
				},
			});
			user.profile = profile._id;
			const result = await user.save();
			res.status(201).json({ success: true, user: result });
		}
	} catch (error) {
		console.error(error);
		next(error.message);
	}
};
module.exports = user;
