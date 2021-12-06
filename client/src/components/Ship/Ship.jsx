import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import classes from './ship.module.css';

const Ship = ({ setPage }) => {
	const [value, setValue] = useState('standard');
	const cart = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const { address } = cart;

	useEffect(
		() => !address.address && navigate('/shipping/address'),
		[address.address, navigate]
	);

	return (
		<>
			<Breadcrumb activeItem='ship' />
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
						<b>
							{`${address.address}, ${address.city}, ${address.country}`}
						</b>
					</div>
					<div className={classes.shipCol}>
						<Link
							to='/shipping/address'
							className={classes.editBtn}>
							edit
						</Link>
					</div>
				</div>
			</div>
			<h3 className={classes.methodLead}>Shipping Methods</h3>
			<form className={classes.method}>
				<div className={classes.shipMethod}>
					<label className={classes.label}>
						<input
							value='standard'
							type='radio'
							name='standard'
							id='standard'
							checked={value === 'standard'}
							className={classes.radioInput}
							onChange={(e) => setValue(e.target.value)}
						/>
						Standard Shipping
					</label>
					<b>Free</b>
				</div>
				<div className={classes.btnDiv}>
					<Link
						to='/cart'
						className={classes.button}
						style={{ background: 'gray' }}>
						Back cart
					</Link>
					<Link
						to='/payment'
						type='submit'
						className={classes.button}>
						Continue
					</Link>
				</div>
			</form>
		</>
	);
};

export default Ship;
