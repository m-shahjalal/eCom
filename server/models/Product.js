const { Schema, model } = require('mongoose');

const reviewSchema = Schema(
	{
		name: { type: String },
		rating: { type: [Number, 'give a number'], required: true },
		comment: { type: String },
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			default: 0,
		},
		numReviews: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = model('Product', productSchema);

module.exports = Product;
