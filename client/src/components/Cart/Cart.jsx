import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	clearCart,
	decrementItem,
	incrementItem,
	removeFromCart,
	saveSubtotal,
} from '../../store/cart/action';
import classes from './cart.module.css';

const Cart = () => {
	const cart = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();
	const [total, setTotal] = useState(0);
	const user = useSelector((state) => state.userLogin);
	const isLoggedIn = user ? user.isLoggedIn : false;
	const history = useHistory();

	const processHandler = () => {
		dispatch(saveSubtotal(total));
		isLoggedIn
			? history.push('/shipping')
			: history.push('/login', {
					goto: '/shipping',
					alert: 'Log in or singup to checkout',
			  });
	};
	const clearCartButton = () => {
		dispatch(clearCart());
		history.push('/');
	};

	useEffect(() => window.scrollTo({ behavior: 'smooth', top: 0 }), []);
	useEffect(() => {
		let total = 0;
		cart.forEach((item) => {
			const sum = item.price * item.count;
			total = total + sum;
		});
		setTotal(total);
	}, [cart]);

	return (
		<div className={classes.cart}>
			<h1 className={classes.head}>
				{cart.length > 0 ? 'Your cart items' : 'No items in the cart!'}
			</h1>
			{cart.length > 0 ? (
				<button onClick={clearCartButton} className={classes.link}>
					Clear cart
				</button>
			) : (
				<Link to='/' className={classes.link}>
					Back to shopping
				</Link>
			)}

			<div className={classes.table}>
				{cart.map((item) => (
					<div className={classes.row} key={item._id}>
						<div className={classes.product}>
							<Link
								to={{
									state: item,
									pathname: `/products/${item._id}`,
								}}
								className={classes.imageDiv}>
								<img
									src={item.image}
									alt='cover'
									className={classes.image}
								/>
							</Link>
							<div className={classes.right}>
								<Link
									to={{
										state: item,
										pathname: `/products/${item._id}`,
									}}
									className={classes.title}>
									{item.name}
								</Link>
								<button
									className={classes.remove}
									onClick={() =>
										dispatch(removeFromCart(item._id))
									}>
									Remove item
								</button>
							</div>
						</div>
						<div className={classes.additional}>
							<div className={classes.price}>${item.price}</div>
							<div className={classes.quantity}>
								<div className={classes.counter}>
									<span
										onClick={() =>
											dispatch(decrementItem(item))
										}
										className={classes.sign}>
										-
									</span>
									<span className={classes.num}>
										{item.count}
									</span>
									<span
										onClick={() =>
											dispatch(incrementItem(item))
										}
										className={classes.sign}>
										+
									</span>
								</div>
							</div>
							<div className={classes.total}>
								$
								{parseFloat(item.price * item.count).toFixed(2)}
							</div>
						</div>
					</div>
				))}
			</div>

			<hr />
			{cart.length > 0 && (
				<div className={classes.bottom}>
					<div className={classes.amount}>
						<div className={classes.amountRow}>
							<span className={classes.subtotal}>
								Sub total -
							</span>
							<b>${parseFloat(total).toFixed(2)}</b>
						</div>
						<p className={classes.condition}>
							Tax and shipping cost will be calculated later
						</p>
					</div>
					<button onClick={processHandler} className={classes.button}>
						Check OUt
					</button>
				</div>
			)}
		</div>
	);
};

export default Cart;
