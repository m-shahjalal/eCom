import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import actions from '../../store/user/action';
import classes from './profile.module.css';
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	tagline: Yup.string().required('tagline is required'),
	contact: Yup.string()
		.required('required')
		.matches(phoneRegExp, 'Phone number is not valid')
		.min(8, 'too short')
		.max(15, 'too long')
		.required('phone is required'),
	address: Yup.string().required('address is required'),
	city: Yup.string().required('city is required'),
	country: Yup.string().required('country is required'),
	zipCode: Yup.string().required('zip code is required'),
	avatar: Yup.mixed()
		.test('fileSize', 'File Size is too large', (value) => {
			if (value === undefined) {
				return true;
			} else {
				return value.size < 1024 * 1024 * 1024;
			}
		})
		.test('fileType', 'Unsupported File Format', (value) => {
			if (value === undefined) {
				return true;
			} else {
				const supported = [
					'image/webp',
					'image/png',
					'image/jpg',
					'image/jpeg',
				];
				return supported.includes(value.type);
			}
		}),
});

const EditProfile = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const initialValues = {
		name: state?.name || '',
		tagline: state?.tagline || '',
		contact: state?.contact || '',
		address: state?.address?.line || '',
		city: state?.address?.city || '',
		country: state?.address?.country || '',
		zipCode: state?.address?.zipcode || '',
		avatar: '',
	};
	const submitHandler = (values) => {
		const data = new FormData();
		for (const key in values) {
			data.append(key, values[key]);
		}
		dispatch(actions.updateUser(state.id, data));
	};

	useEffect(() => !state && navigate('/profile'), [state, navigate]);
	useEffect(
		() => userDetails.success && navigate('/profile'),
		[state, navigate, userDetails.success]
	);

	return (
		<div className={classes.edit}>
			<Formik
				initialValues={initialValues}
				onSubmit={submitHandler}
				validationSchema={validationSchema}>
				{({ errors, touched, handleChange, setFieldValue, values }) => (
					<Form className={classes.form}>
						<div className={classes.cardForm}>
							<h3 className={classes.editLead}>Edit Profile</h3>
							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='name'>
									Name
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='name'
									name='name'
								/>
								{touched.name && errors.name && (
									<div className={classes.error}>
										{errors.name}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='tagline'>
									tagline
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='tagline'
									name='tagline'
								/>
								{touched.tagline && errors.tagline && (
									<div className={classes.error}>
										{errors.tagline}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='contact'>
									Phone Number
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='contact'
									name='contact'
								/>

								{touched.contact && errors.contact && (
									<div className={classes.error}>
										{errors.contact}
									</div>
								)}
							</label>
							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='address'>
									address
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='address'
									name='address'
								/>

								{touched.address && errors.address && (
									<div className={classes.error}>
										{errors.address}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='city'>
									city
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='city'
									name='city'
								/>

								{touched.city && errors.city && (
									<div className={classes.error}>
										{errors.city}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='country'>
									Country
								</span>
								<Field
									name='country'
									as='select'
									className={classes.fieldInput}
									id='country'>
									<option value=''>Select Country</option>
									<option value='bangladesh'>
										Bangladesh
									</option>
									<option value='in'>India</option>
									<option value='us'>USA</option>
								</Field>

								{touched.country && errors.country && (
									<div className={classes.error}>
										{errors.country}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='zipCode'>
									Zip code
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='zipCode'
									name='zipCode'
								/>

								{touched.zipCode && errors.zipCode && (
									<div className={classes.error}>
										{errors.zipCode}
									</div>
								)}
							</label>

							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='avatar'>
									Profile picture (max size: 1MB)
								</span>
								<input
									className={`${classes.fieldInput} ${classes.fileInput}`}
									type='file'
									id='avatar'
									name='avatar'
									onChange={(e) =>
										setFieldValue(
											'avatar',
											e.currentTarget.files[0]
										)
									}
								/>

								{touched.avatar && errors.avatar && (
									<div className={classes.error}>
										{errors.avatar}
									</div>
								)}
							</label>
							<button type='submit' className={classes.submit}>
								{userDetails?.loading ? (
									<div className='loader-sm'></div>
								) : (
									'continue'
								)}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default EditProfile;
