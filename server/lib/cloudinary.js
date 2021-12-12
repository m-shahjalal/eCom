const cloudinary = require('cloudinary').v2;

const cloudName = process.env.CLOUD_NAME;
const cloudinaryApi = process.env.CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
	cloud_name: cloudName,
	api_key: cloudinaryApi,
	api_secret: cloudinarySecret,
});

const cloudUploader = {};

cloudUploader.cloudUpload = (file, folder) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			file,
			{
				resource_type: 'auto',
				folder: folder,
			},
			(err, data) => {
				if (err) return reject(err);
				if (data)
					return resolve({
						url: data.url,
						id: data.public_id,
					});
			}
		);
	});
};

cloudUploader.cloudDelete = (id) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(id, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
};

module.exports = cloudUploader;
