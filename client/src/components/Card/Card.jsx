import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/cart/action';
import classes from './card.module.css';

const Card = ({ product }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);
	const cart = cartItems.items;
	const [notification, setNotification] = useState(false);

	useEffect(() => {
		let time;
		if (notification) time = setTimeout(() => setNotification(false), 2000);
		return () => clearTimeout(time);
	}, [notification, setNotification]);

	const addCart = (item) => {
		const isAlreadyAdded = cart.findIndex((itm) => itm._id === item._id);
		isAlreadyAdded === -1
			? dispatch(addToCart({ ...item, count: 1 }))
			: setNotification('already added to cart');
	};

	return (
		<div className={classes.list}>
			<Link to={`/products/${product._id}`} className={classes.imageDiv}>
				<img
					className={classes.image}
					src={product.image}
					alt='product.description'
				/>
			</Link>
			<Link to={`/products/${product._id}`} className={classes.title}>
				{product.name}
			</Link>
			<div className={classes.bottom}>
				<div className={classes.cart} onClick={() => addCart(product)}>
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
							d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
						/>
					</svg>
				</div>
				<div className={classes.price}>${product.price}</div>
			</div>
			{notification && (
				<div className={classes.alert}>{notification}</div>
			)}
		</div>
	);
};

export default Card;
