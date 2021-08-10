import Order from '../components/Order/Order';
import logo from '../images/logo.png';
import classes from './screen.module.css';

const PlaceOrderScreen = () => {
	return (
		<div className='px-4'>
			<img src={logo} alt='logo' className={classes.logo} />
			<Order />
		</div>
	);
};

export default PlaceOrderScreen;
