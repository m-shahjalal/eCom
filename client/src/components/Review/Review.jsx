import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Star from 'react-star-rating-component';
import { reviewCreate } from '../../store/product/action';
import classes from './review.module.css';

const Review = ({ id, review }) => {
	const productReview = useSelector((state) => state.productReview);
	const userLogin = useSelector((state) => state.userLogin);
	const [value, setValue] = useState({ rate: 0, text: '' });
	const [notification, setNotification] = useState(false);

	useEffect(() => {
		let time;
		if (notification) time = setTimeout(() => setNotification(false), 2000);
		return () => clearTimeout(time);
	}, [notification, setNotification]);
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		setNotification(false);
		if (!Boolean(value.rate) || !Boolean(value.text)) {
			setNotification('two fields required');
		}
		if (value.rate && value.text) {
			dispatch(reviewCreate(id, value));
			setValue({ rate: '', text: '' });
		}
	};
	return (
		<div className={classes.review}>
			<div className={classes.inputBox}>
				{userLogin?.user?.email ? (
					<>
						<form onSubmit={handleSubmit}>
							<div className={classes.form}>
								<div className={classes.innerRow1}>
									<textarea
										onChange={(e) =>
											setValue({
												...value,
												text: e.target.value,
											})
										}
										name='text'
										id='text'
										className={classes.textarea}
										placeholder='Give a rate to this product ...'
									/>
								</div>
								<div className={classes.innerRow2}>
									<select
										name='rate'
										id='rate'
										onChange={(e) =>
											setValue({
												...value,
												rate: e.target.value,
											})
										}
										className={classes.input}>
										<option value='0'>Select...</option>
										<option value='1'>1 - Poor</option>
										<option value='2'>2 - Fair</option>
										<option value='3'>3 - Good</option>
										<option value='4'>4 - Very Good</option>
										<option value='5'>5 - Excellent</option>
									</select>

									<button
										type='submit'
										value='submit'
										className={classes.submit}>
										{productReview.loading && (
											<div className='loader-sm'></div>
										)}
										submit
									</button>
									{notification && (
										<div className={classes.error}>
											{notification}
										</div>
									)}
								</div>
							</div>
						</form>
						{productReview.error && (
							<div className={classes.feedBackError}>
								{productReview.error} <br />
								N.B. you can only review once
							</div>
						)}
					</>
				) : (
					<div className={classes.loginAlert}>
						Login to review this product
						<Link
							to={{
								pathname: '/login',
								state: { goto: `/products/${id}` },
							}}
							className={classes.loginButton}>
							login
						</Link>
					</div>
				)}
			</div>
			<div className={classes.reviewBox}>
				{review?.map((item) => (
					<div className={classes.card} key={item._id}>
						<div className={classes.cardTop}>
							<div className={classes.reviewer}>{item.name}</div>
							<div className={classes.rating}>
								<Star
									name='rate'
									value={parseInt(item.rating)}
									starColor='#56b280'
									emptyStarColor='#242423'
									editing={false}
								/>
							</div>
						</div>
						<div className={classes.comment}>{item.comment}</div>
						<di className={classes.timeStamp}>
							{`${item.createdAt.slice(
								0,
								10
							)} - ${item.createdAt.slice(11, 20)}`}
						</di>
					</div>
				))}
			</div>
		</div>
	);
};

export default Review;
