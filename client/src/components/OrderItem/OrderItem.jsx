import { useLocation } from 'react-router-dom';
import classes from './item.module.css';

const OrderItem = () => {
	const { state } = useLocation();
	console.log(state)
	return (
		<div className={classes.contain}>
			<h2 className={classes.lead}>Order Details</h2>
			<div className={classes.order}>
				<div className={classes.aboutCard}>
					<div className={classes.row}>
						<div className={classes.col}>Order id:</div>
						<div className={`${classes.col2} ${classes.underline}`}>
							#{state._id}
						</div>
					</div>
					<div className={classes.row}>
						<div className={classes.col}>Ordered Time</div>
						<div className={classes.col2}>{`${state.createdAt.slice(
							0,
							10
						)} - ${state.createdAt.slice(11, 19)}`}</div>
					</div>
					<div className={classes.row}>
						<div className={classes.col}>billing address</div>
						<div
							className={
								classes.col2
							}>{`${state.shippingAddress.address} ${state.shippingAddress.city} ${state.shippingAddress.country} -${state.shippingAddress.postalCode}`}</div>
					</div>
					<div className={classes.row}>
						<div className={classes.col}>Delivery</div>
						<div className={classes.col2}>
							{state.isDelivered ? 'completed' : 'uncompleted'}
						</div>
					</div>
					<div className={classes.row}>
						<div className={classes.col}>Payment Status</div>
						<div className={classes.col2}>
							status -{state.paymentResult.status}
							<br />
							id: {state.paymentResult.id}
						</div>
					</div>
					<div className={classes.row}>
						<div className={classes.col}>Total paid</div>
						<div className={classes.col2}>
							${state.amount / 100}
						</div>
					</div>
				</div>
				<h3 className={classes.lead}>Ordered items</h3>
				<div className={classes.items}>
					{state.items.map((item) => (
						<div className={classes.item} key={item._id}>
							<div className={classes.imageDiv}>
								<img
									className={classes.image}
									src={item.image}
									alt='product'
								/>
							</div>
							<div className={classes.itemName}>{item.name}</div>
							<div className={classes.innerRow}>
								<div className={classes.quantity}>
									{item.qty} pcs
								</div>
								<div className={classes.quantity}>
									${item.qty * item.price}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
