import Ship from '../components/Ship/Ship';
import logo from '../images/logo.png';
import classes from './screen.module.css';

const ShippingScreen = () => {
	return (
		<div className='px-4'>
			<img src={logo} alt='logo' className={classes.logo} />
			<Ship />
		</div>
	);
};

export default ShippingScreen;
