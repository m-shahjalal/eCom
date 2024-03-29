import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import actions from '../../store/admin/actions';
import classes from './AddProduct.module.css';

const supported = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg'];

const AddProduct = () => {
	const { state } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, data, error } = useSelector((reduxState) => {
		if (state?._id) {
			return reduxState.adUpdateProduct;
		} else {
			return reduxState.adProductAdd;
		}
	});
	const formik = useFormik({
		initialValues: {
			name: state?.name || '',
			price: state?.price || '',
			category: state?.category || '',
			image: '',
			description: state?.description || '',
		},

		onSubmit: (values) => {
			const formData = new FormData();
			Object.keys(values).forEach((value) =>
				formData.append(value, values[value])
			);
			!state._id
				? dispatch(actions.addProduct(formData))
				: dispatch(actions.updateProduct(state._id, formData));
		},

		validate: (value) => {
			const error = {};
			if (!value.name) error.name = 'name is required';
			if (!value.price) error.price = 'price is required';
			if (!value.category) error.category = 'category is required';
			if (!value.description)
				error.description = 'description is required';

			if (!state?.image) {
				if (!value.image) error.image = 'category is required';
				if (!supported.includes(value.image?.type))
					error.image = 'Only image acceptable';
				if (value.image.size > 1024 * 2048)
					error.image = 'max image size 2MB';
			}
			return error;
		},
	});

	useEffect(() => {
		state?._id &&
			data?.success &&
			navigate('/admin/products', { replace: true });
		return () => dispatch(actions.updateProductInitial());
	}, [state?._id, data?.success, navigate, dispatch]);

	useEffect(
		() => {
			data?.success && formik.resetForm();
			return () => dispatch(actions.addProductInitial());
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data?.success]
	);

	return (
		<div className={classes.productContainer}>
			<div className='bg-gradient-to-b h-96'></div>
			<div className='max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 pb-16'>
				<div className={classes.inputContainer}>
					<h2 className={classes.lead}>Add Product</h2>
					{error && (
						<div className='text-red-600 text-center mt-4'>
							{error}
						</div>
					)}
					{data?.success && (
						<div className='text-green-600 text-center mt-4'>
							Product has been{' '}
							{`${state?._id ? 'updated' : 'created'}`}{' '}
							successfully
						</div>
					)}
					<form onSubmit={formik.handleSubmit}>
						<div className='md:flex items-center mt-8'>
							<div className='w-full flex flex-col'>
								<label className={classes.label}>
									Product Name
								</label>
								<input
									required
									type='text'
									name='name'
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={classes.input}
								/>
								{formik.touched.name && formik.errors.name && (
									<div className={classes.error}>
										{formik.errors.name}
									</div>
								)}
							</div>
						</div>
						<div className='md:flex items-center mt-8'>
							<div className='w-full md:w-1/2 flex flex-col'>
								<label className={classes.label}>Price</label>
								<input
									required
									type='text'
									name='price'
									value={formik.values.price}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={classes.input}
								/>
								{formik.touched.price &&
									formik.errors.price && (
										<div className={classes.error}>
											{formik.errors.price}
										</div>
									)}
							</div>
							<div className='w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4'>
								<label className={classes.label}>
									Category
								</label>
								<input
									required
									type='text'
									name='category'
									value={formik.values.category}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={classes.input}
								/>
								{formik.touched.category &&
									formik.errors.category && (
										<div className={classes.error}>
											{formik.errors.category}
										</div>
									)}
							</div>
						</div>

						<div className='md:flex items-center mt-8'>
							<div className='w-full flex flex-col'>
								<label className={classes.label}>Image</label>
								<input
									type='file'
									name='image'
									onChange={(e) =>
										formik.setFieldValue(
											'image',
											e.target.files[0]
										)
									}
									value={formik.values.email}
									onBlur={formik.handleBlur}
									className={classes.input}
								/>
								{formik.touched.image &&
									formik.errors.image && (
										<div className={classes.error}>
											{formik.errors.image}
										</div>
									)}
							</div>
						</div>

						<div className='md:flex items-center mt-8'>
							<div className='w-full flex flex-col'>
								<label className={classes.label}>
									Description
								</label>
								<textarea
									required
									type='text'
									name='description'
									value={formik.values.description}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={classes.textField}
								/>
								{formik.touched.description &&
									formik.errors.description && (
										<div className={classes.error}>
											{formik.errors.description}
										</div>
									)}
							</div>
						</div>

						<div className='flex items-center justify-center w-full'>
							<button
								type='submit'
								className={classes.submitButton}>
								{loading && <span className='loader-sm'></span>}
								<span className='mx-2'>UPLOAD</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;

// name, price, category, image, description,
