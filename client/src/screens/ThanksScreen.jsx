import { Link, useLocation } from 'react-router-dom';
import Tick from '../components/Tick/Tick';
import classes from './screen.module.css';

const ThanksScreen = () => {
	const { state } = useLocation();
	return (
		<div className={classes.thanks}>
			{state ? (
				<>
					<div className={classes.svg}>
						<Tick />
					</div>
					<div className={classes.thanksLead}>
						Order placed successfully
					</div>
					<div className={classes.orderNum}>
						Order: #{state.orderId && state.orderId}{' '}
					</div>
					<a
						href={state.receptLink ? state.receptLink : '#'}
						target='_blank'
						rel='noreferrer'
						className={classes.out}>
						download recept
					</a>
					<div className={classes.successText}>
						Thank you Joe for buying Candleaf. The nature is
						grateful to you. Now that your order is confirmed it
						will be ready to ship in 2 days. Please check your inbox
						in the future for your order updates.
					</div>
					<Link to='/' className={classes.backToShop}>
						Back to shopping
					</Link>
				</>
			) : (
				<div className='loader'></div>
			)}
		</div>
	);
};

export default ThanksScreen;
