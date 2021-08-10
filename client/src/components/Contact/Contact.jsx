import { useState } from 'react';
import classes from './contact.module.css';

const Contact = () => {
	const [values, setValues] = useState({ name: '', email: '', message: '' });
	const changeHandler = (e) =>
		setValues({ ...values, [e.target.name]: e.target.value });

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(values);
	};
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
						onSubmit={submitHandler}
						className={classes.inputContainer}>
						<div className={classes.row}>
							<input
								type='text'
								id='name'
								name='name'
								className={classes.input}
								placeholder='Your Name'
								value={values.name}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes.row}>
							<input
								type='email'
								id='email'
								name='email'
								className={classes.input}
								placeholder='Your Email'
								value={values.email}
								onChange={changeHandler}
							/>
						</div>
						<div className={classes.textareaRow}>
							<textarea
								id='message'
								name='message'
								className={classes.textarea}
								placeholder='Your Valuable message...'
								value={values.message}
								onChange={changeHandler}
							/>
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
