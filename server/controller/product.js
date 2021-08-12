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

product.getSearchProducts = async (req, res, next) => {
	const keyword = { name: { $regex: String(req.query.q), $options: 'i' } };
	try {
		const products = await Product.find({ ...keyword });
		res.status(200).json(products);
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
		const product = await Product.find({}).sort({ rating: -1 }).limit(4);
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};

product.categoryProducts = async (req, res, next) => {
	const { category } = req.params;
	try {
		const items = await Product.find({ category: category });
		res.status(200).json(items);
	} catch (error) {
		next(error.message);
	}
};

product.createProductReview = async (req, res, next) => {
	const { rate, text } = req.body;
	const { id } = req.params;
	try {
		const product = await Product.findById(req.params.id);

		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			return res.status(400).json({
				error: 'Product already reviewed',
				success: false,
			});
		}

		const review = {
			user: req.user._id,
			name: req.user.name,
			rating: parseInt(rate),
			comment: text,
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce(
				(acc, item) => parseInt(item.rating) + acc,
				0
			) / product.reviews.length;
		await product.save();
		res.status(201).json({ success: true });
	} catch (error) {
		console.error(error);
		next(error);
	}
};
module.exports = product;
