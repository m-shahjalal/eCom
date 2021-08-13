import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import actions from '../../store/user/action';
import classes from './login.module.css';

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email('invalid email').required('email is required'),
	password: Yup.string().min(6).required('password is required'),
});

const Login = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const history = useHistory();
	const { state } = useLocation();
	const dispatch = useDispatch();
	const submitHandler = (value) => {
		dispatch(actions.login(value));
	};
	useEffect(() => {
		if (userLogin?.user?.email) {
			history.push(state?.goto || '/profile');
		}
	}, [history, state, userLogin]);
	return (
		<section className={classes.sign}>
			<div className={classes.signContainer}>
				<div className={classes.leftRow}>
					<h1 className={classes.lead}>
						Be first to buy an awesome tree, make yourself more
						joyous
					</h1>
					<p className={classes.text}>
						Poke slow-carb mixtape knausgaard, typewriter street art
						gentrify hammock starladder roathse. Craies vegan
						tousled etsy austin.
					</p>
				</div>
				<div className={classes.rightColumn}>
					{state?.alert ? (
						<h3 className={classes.alert}>{state?.alert}</h3>
					) : null}
					<h2 className={classes.signLead}>Log in</h2>
					{userLogin.error && (
						<div className={classes.error}>{userLogin.error}</div>
					)}
					<Formik
						initialValues={initialValues}
						onSubmit={submitHandler}
						validationSchema={validationSchema}>
						{({ errors, touched }) => (
							<Form>
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
								<button
									type='submit'
									className={classes.button}>
									{userLogin.loading && (
										<div className='loader-sm'></div>
									)}
									{'  '}
									Button
								</button>
							</Form>
						)}
					</Formik>
					<p className={classes.bottom}>
						Don't have account ?
						<Link
							to={{ pathname: '/signup', state }}
							className={classes.changeBtn}>
							sign up
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
