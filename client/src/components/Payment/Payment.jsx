import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Atm from './Atm';
import classes from './checkout.module.css';

const Payment = () => {
	const cart = useSelector((state) => state.cart);
	const { address } = cart;
	const history = useHistory();
	if (!address.email) history.push('/shipping');
	return (
		<>
			<div className={classes.ship}>
				<div className={classes.contactTo}>
					<div className={classes.shipCol}>
						<span className={classes.gray}>Contact: </span>{' '}
						<b>{address.email}</b>
					</div>
					<div className={classes.shipCol}>
						<Link
							to='/shipping/address'
							className={classes.editBtn}>
							edit
						</Link>
					</div>
				</div>
				<div className={classes.contactTo}>
					<div className={classes.shipCol}>
						<span className={classes.gray}>Ship to:</span>{' '}
						<b>{`${address.address}, ${address.city}, ${address.country}`}</b>
					</div>
					<div className={classes.shipCol}>
						<Link
							to='/shipping/address'
							className={classes.editBtn}>
							edit
						</Link>
					</div>
				</div>
				<div className={classes.contactTo}>
					<div className={classes.shipCol}>
						<span className={classes.gray}>Method</span>{' '}
						<b>Standard Shipping</b> - free
					</div>
				</div>
			</div>
			<div className={classes.payment}>
				<Atm />
			</div>
		</>
	);
};

export default Payment;
