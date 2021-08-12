import { useFormik } from 'formik';
import classes from './contact.module.css';

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const Contact = () => {
	const formik = useFormik({
		initialValues: { name: '', email: '', message: '' },
		onSubmit: (value) => {
			console.log(value);
		},
		validate: (value) => {
			const error = {};
			if (!value.name) error.name = 'name is required';
			if (!validateEmail(value.email)) error.email = 'give a valid email';
			if (!value.message) error.message = 'message is required';
			if (value.message.length < 30)
				error.message = 'Message Must be grater than 30 characters';
			return error;
		},
	});

	return (
		<section className={classes.contact}>
			<div className={classes.containerDiv}>
				<div className={classes.top}>
					<h1 className={classes.head}>Contact Us</h1>
					<p className={classes.text}>
						Whatever cardigan tote bag tumblr hexagon brooklyn
						asymmetrical gentrify.
					</p>
				</div>
				<div className='inputTop'>
					<form
						onSubmit={formik.handleSubmit}
						className={classes.inputContainer}>
						<div className={classes.row}>
							<input
								type='text'
								id='name'
								name='name'
								className={classes.input}
								placeholder='Your Name'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.name && formik.errors.name && (
								<div className={classes.error}>
									{formik.errors.name}
								</div>
							)}
						</div>
						<div className={classes.row}>
							<input
								type='email'
								id='email'
								name='email'
								className={classes.input}
								placeholder='Your Email'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.email && formik.errors.email && (
								<div className={classes.error}>
									{formik.errors.email}
								</div>
							)}
						</div>
						<div className={classes.textareaRow}>
							<textarea
								id='message'
								name='message'
								className={classes.textarea}
								placeholder='Your Valuable message...'
								value={formik.values.message}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.message &&
								formik.errors.message && (
									<div className={classes.error}>
										{formik.errors.message}
									</div>
								)}
						</div>
						<div className={classes.textareaRow}>
							<button type='submit' className={classes.button}>
								Button
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
