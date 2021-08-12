import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearCart } from '../../store/cart/action';
import actions from '../../store/order/action';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import classes from './order.module.css';

const Order = () => {
	const history = useHistory();
	const cart = useSelector((state) => state.cart);
	const orderCreate = useSelector((state) => state.orderCreate);
	const [tax, setTax] = useState(0);
	const { address, subTotal, items, payment } = cart;
	const dispatch = useDispatch();
	const processHandler = () => {
		dispatch(
			actions.createOrder({ items, address, payment, subTotal, tax })
		);
		dispatch(clearCart());
	};
	useEffect(() => setTax((15 / 100) * subTotal), [setTax, subTotal]);
	useEffect(() => {
		if (orderCreate.success) {
			history.push('/completed', {
				orderId: orderCreate.order?.orderId || false,
				receptLink: orderCreate.order?.recept || false,
			});
		}
	}, [history, orderCreate]);
	return (
		<>
			<Breadcrumb activeItem={'order'} />
			<div className={classes.order}>
				<div className={classes.contactTo}>
					<div className={classes.orderCol}>
						<span className={classes.gray}>Contact: </span>{' '}
						<b>{address.email}</b>
					</div>
					<div className={classes.orderCol}>
						<Link
							to='/shipping/address'
							className={classes.editBtn}>
							edit
						</Link>
					</div>
				</div>
				<div className={classes.contactTo}>
					<div className={classes.orderCol}>
						<span className={classes.gray}>Ship to:</span>{' '}
						<b>{`${address.address}, ${address.city}, ${address.country}`}</b>
					</div>
					<div className={classes.orderCol}>
						<Link
							to='/shipping/address'
							className={classes.editBtn}>
							edit
						</Link>
					</div>
				</div>
				<div className={classes.contactTo}>
					<div className={classes.orderCol}>
						<span className={classes.gray}>Method</span>{' '}
						<b>Standard Shipping</b> - free
					</div>
				</div>
			</div>
			<div className={classes.lead}>Order details</div>
			<div className={classes.bottomRow}>
				<div className={classes.headRow}>
					<div className={classes.headCol}>
						<div className={classes.headItem}>Item Name</div>
						<div className={classes.headItem}>Item Price</div>
					</div>
					{items.map((item) => (
						<div className={classes.cartItem} key={item._id}>
							<div className={classes.innerCol}>
								{item.name} -(<b>{item.count} pcs </b> )
							</div>
							<div className={classes.innerCol}>
								${item.price * item.count}
							</div>
						</div>
					))}
					<div className={classes.total}>
						<div className={classes.totalFlex}>
							<div className={classes.innerCol}>
								Product Price:{' '}
							</div>
							<div className={classes.innerCol}>
								{' '}
								${subTotal}{' '}
							</div>
						</div>
						<div className={classes.totalFlex}>
							<div className={classes.innerCol}>
								Delivery charge:{' '}
							</div>
							<div className={classes.innerCol}> $0 </div>
						</div>
						<div className={classes.totalFlex}>
							<div className={classes.innerCol}>15% VAT: </div>
							<div className={classes.innerCol}>
								${parseFloat(tax).toFixed(2)}
							</div>
						</div>
						<div className={classes.totalFlex}>
							<div className={classes.innerCol}>Total: </div>
							<div className={classes.innerCol}>
								${tax + subTotal}
							</div>
						</div>
					</div>
				</div>
			</div>
			{orderCreate?.success === false && (
				<div className={classes.error}>{orderCreate.error}</div>
			)}
			<div className={classes.btnDiv}>
				<Link
					to='/payment'
					className={classes.button}
					style={{ background: 'gray' }}>
					Back to payment
				</Link>
				<button
					type='button'
					onClick={processHandler}
					className={classes.button}>
					{!orderCreate.loading ? (
						'Place order'
					) : (
						<div className={classes.loadingDiv}>
							<div className='loader-sm'></div>{' '}
							<div>loading...</div>
						</div>
					)}
				</button>
			</div>
		</>
	);
};

export default Order;
