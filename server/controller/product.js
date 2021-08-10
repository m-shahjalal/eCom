const cloudinary = require('../lib/cloudinary');
const fs = require('fs');
const Product = require('../models/Product');

const product = {};

product.addProduct = async (req, res, next) => {
	const { name, category, description, price } = req.body;

	try {
		if (!req.file) return res.json({ error: 'select an image file' });

		const uploader = async (path) =>
			await cloudinary(path, 'ecom/products');

		const { path } = req.file;
		const { url } = await uploader(path);
		fs.unlinkSync(path);

		const product = await Product.create({
			name,
			description,
			category,
			price,
			image: url,
		});

		res.json({ created: true, product });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

product.getProducts = async (req, res, next) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	// search implementation
	const keyword = req.query.q
		? { name: { $regex: req.query.q, $options: 'i' } }
		: {};

	try {
		const count = await Product.countDocuments({ ...keyword });
		const products = await Product.find({ ...keyword })
			.skip(skip)
			.limit(limit);

		const pages = Math.ceil(count / limit);
		res.json({ skip, page, limit, pages, products });
	} catch (error) {
		next(error);
	}
};

product.getSingleProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		const product = await Product.findOne({ _id: id });
		res.json(product);
	} catch (error) {
		next(error);
	}
};

product.popular = async (req, res, next) => {
	try {
		res.json(await Product.find().limit(4));
	} catch (error) {
		next(error);
	}
};

module.exports = product;
