import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import actions from '../../store/user/action';
import classes from './sign.module.css';

const initialValues = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('invalid email').required('email is required'),
	password: Yup.string().min(6).required('password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'password must match')
		.required('confirm password must be provided'),
});

const Sign = ({ state }) => {
	const navigate = useNavigate();
	const userSignup = useSelector((state) => state.userSignup);
	const dispatch = useDispatch();
	const submitHandler = (values) => {
		dispatch(actions.register(values));
	};
	useEffect(() => {
		userSignup.success && navigate('/login', { state: state });
	}, [navigate, userSignup.success, state]);

	console.log(state);

	return (
		<section className={classes.sign}>
			<div className={classes.signContainer}>
				<div className={classes.leftRow}>
					<h1 className={classes.lead}>
						Join an Change your environment to live peacefully with
						your children!
					</h1>
					<p className={classes.text}>
						Poke slow-carb mixtape knausgaard, typewriter street art
						gentrify hammock starladder roathse. Craies vegan
						tousled etsy austin.
					</p>
				</div>
				<div className={classes.rightColumn}>
					<h2 className={classes.signLead}>Sign Up</h2>
					{userSignup.error && (
						<div className={classes.leadError}>
							{userSignup.error}
						</div>
					)}
					<Formik
						initialValues={initialValues}
						onSubmit={submitHandler}
						validationSchema={validationSchema}>
						{({ errors, touched }) => (
							<Form>
								<div className={classes.col}>
									<label
										htmlFor='name'
										className={classes.label}>
										name
									</label>
									<Field
										autoComplete='false'
										type='name'
										id='name'
										name='name'
										className={classes.input}
									/>
									{touched.name && errors.name && (
										<div className={classes.error}>
											{errors.name}
										</div>
									)}
								</div>
								<div className={classes.col}>
									<label
										htmlFor='email'
										className={classes.label}>
										Email
									</label>
									<Field
										autoComplete='false'
										type='email'
										id='email'
										name='email'
										className={classes.input}
									/>
									{touched.email && errors.email && (
										<div className={classes.error}>
											{errors.email}
										</div>
									)}
								</div>
								<div className={classes.col}>
									<label
										htmlFor='password'
										className={classes.label}>
										Password
									</label>
									<Field
										autoComplete='false'
										type='password'
										id='password'
										name='password'
										className={classes.input}
									/>
									{touched.password && errors.password && (
										<div className={classes.error}>
											{errors.password}
										</div>
									)}
								</div>
								<div className={classes.col}>
									<label
										htmlFor='confirmPassword'
										className={classes.label}>
										confirm password
									</label>
									<Field
										autoComplete='false'
										type='password'
										id='confirmPassword'
										name='confirmPassword'
										className={classes.input}
									/>
									{touched.confirmPassword &&
										errors.confirmPassword && (
											<div className={classes.error}>
												{errors.confirmPassword}
											</div>
										)}
								</div>
								<button
									type='submit'
									className={classes.button}>
									{userSignup.loading && (
										<div className='loader-sm'></div>
									)}
									<span> submit</span>
								</button>
							</Form>
						)}
					</Formik>
					<p className={classes.bottom}>
						Already have an account ?
						<Link
							state={state}
							to={{ pathname: '/login' }}
							className={classes.changeBtn}>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Sign;
