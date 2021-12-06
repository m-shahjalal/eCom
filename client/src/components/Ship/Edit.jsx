import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { saveShippingAddress } from '../../store/cart/action';
import classes from './ship.module.css';

const savedAddress = JSON.parse(localStorage.getItem('address')) || {};

const initialValues = {
	firstName: savedAddress.firstName || '',
	lastName: savedAddress.lastName || '',
	email: savedAddress.email || '',
	address: savedAddress.address || '',
	city: savedAddress.city || '',
	country: savedAddress.country || '',
	zipcode: savedAddress.zipcode || '',
};

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	address: Yup.string().required('give proper address to ship product'),
	city: Yup.string().required('city is required'),
	country: Yup.string().required('country is required'),
	zipcode: Yup.string().required('zipcode is required'),
	email: Yup.string()
		.email('provide valid email')
		.required('Email is required'),
});

const Edit = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const submitHandler = (value) => {
		dispatch(saveShippingAddress(value));
		navigate('/shipping');
	};
	return (
		<div className={classes.address}>
			<Formik
				initialValues={initialValues}
				onSubmit={submitHandler}
				validationSchema={validationSchema}>
				{({ errors, touched }) => (
					<Form className={classes.form}>
						<div className={classes.card}>
							<h3 className={classes.lead}>
								Please enter your shipping details.
							</h3>
							<div
								className={`${classes.fields} ${classes.fields2}`}>
								<label className={classes.field}>
									<span
										className={classes.fieldLabel}
										htmlFor='firstName'>
										First name
									</span>
									<Field
										className={classes.fieldInput}
										type='text'
										id='firstName'
										name='firstName'
									/>
									{touched.firstName && errors.firstName && (
										<div className={classes.error}>
											{errors.firstName}
										</div>
									)}
								</label>

								<label className={classes.field}>
									<span
										className={classes.fieldLabel}
										htmlFor='lastName'>
										Last name
									</span>
									<Field
										className={classes.fieldInput}
										type='text'
										id='lastName'
										name='lastName'
									/>

									{touched.lastName && errors.lastName && (
										<div className={classes.error}>
											{errors.lastName}
										</div>
									)}
								</label>
							</div>
							<label className={classes.field}>
								<span
									className={classes.fieldLabel}
									htmlFor='address'>
									Address
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
									htmlFor='email'>
									Email
								</span>
								<Field
									className={classes.fieldInput}
									type='text'
									id='email'
									name='email'
								/>

								{touched.email && errors.email && (
									<div className={classes.error}>
										{errors.email}
									</div>
								)}
							</label>

							<div className='fields fields3'>
								<label className={classes.field}>
									<span
										className={classes.fieldLabel}
										htmlFor='zipcode'>
										Zip code
									</span>
									<Field
										className={classes.fieldInput}
										type='text'
										id='zipcode'
										name='zipcode'
									/>

									{touched.zipcode && errors.zipcode && (
										<div className={classes.error}>
											{errors.zipcode}
										</div>
									)}
								</label>

								<label className={classes.field}>
									<span
										className={classes.fieldLabel}
										htmlFor='city'>
										City
									</span>
									<Field
										className={classes.fieldInput}
										type='text'
										id='city'
										name='city'
									/>
									city
									{touched.city && errors.city && (
										<div className={classes.error}>
											{errors.city}
										</div>
									)}
								</label>
							</div>
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
						</div>

						<div className={classes.btnDiv}>
							<Link
								to='/cart'
								className={classes.button}
								style={{ background: 'gray' }}>
								Back to Cart
							</Link>
							<button type='submit' className={classes.button}>
								Continue
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Edit;
