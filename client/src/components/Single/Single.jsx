import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../store/cart/action';
import { productDetails } from '../../store/product/action';
import { addToWish } from '../../store/wish/action';
import classes from './single.module.css';

const Single = () => {
	const wish = useSelector((state) => state.wish);
	const cart = useSelector((state) => state.cart.items);
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const { id } = useParams();
	const [notification, setNotification] = useState(false);
	const findItem = cart.find((item) => item._id === id);
	const [count, setCount] = useState(findItem?.count || 1);

	useEffect(() => {
		dispatch(productDetails(id));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [id, dispatch]);

	useEffect(() => {
		let time;
		if (notification) time = setTimeout(() => setNotification(false), 2000);
		return () => clearTimeout(time);
	}, [notification, setNotification]);

	const addCart = (item) => {
		dispatch(addToCart({ ...item, count }));
	};
	const addWish = (item) => {
		const isAlreadyAdded = wish.findIndex((itm) => itm._id === item._id);
		isAlreadyAdded === -1
			? dispatch(addToWish(item))
			: setNotification('already added to wish');
	};

	return (
		<div className={classes.single}>
			{product.loading ? (
				<div className={classes.loading}>
					<div className='loader'></div>
				</div>
			) : product.error ? (
				<div className={classes.error}>{product.error}</div>
			) : product.product ? (
				<div className={classes.row}>
					<div className={classes.col}>
						<div className={classes.imageDiv}>
							<img
								src={product.product.image}
								alt={product.product.name}
								className={classes.image}
							/>
						</div>
						<div className={classes.lead}>
							{product.product.name}
						</div>
						<div className={classes.delivery}>
							<span className={classes.emo}>🚚</span>
							Free Shipping
						</div>
					</div>
					<div className={classes.col}>
						<p className={classes.category}>
							{product.product.category}
						</p>
						<div className={classes.innerRow}>
							<div className={classes.innerCol}>
								<div className={classes.price}>
									${product.product.price}
								</div>
								<div className={classes.counter}>
									<span
										onClick={() =>
											count > 1 && setCount(count - 1)
										}
										className={classes.plus}>
										-
									</span>
									<span className={classes.quantity}>
										{count}
									</span>
									<span
										onClick={() => setCount(count + 1)}
										className={classes.minus}>
										+
									</span>
								</div>
							</div>
							<div className={classes.innerCol}>
								<button
									className={classes.button}
									onClick={() => addCart(product.product)}>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
										/>
									</svg>
									<span className={classes.buttonText}>
										+ Add to cart
									</span>
								</button>
								<button
									className={classes.button}
									onClick={() => addWish(product.product)}>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
										/>
									</svg>
									<span className={classes.buttonText}>
										+ Add to wish
									</span>
								</button>
							</div>
						</div>
						{notification && (
							<div className={classes.alert}>{notification}</div>
						)}
						<div className={classes.disc}>
							{product.product.description}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Single;
