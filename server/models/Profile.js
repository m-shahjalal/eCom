const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: { type: String, required: true, trim: true },
	tagline: { type: String, required: true, trim: true },
	thumb: { type: String, required: true },
	contact: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true },
	address: {
		line: { type: String, required: true, trim: true },
		city: { type: String, required: true, trim: true },
		country: { type: String, required: true, trim: true },
		zipcode: { type: String, required: true, trim: true },
	},
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;
