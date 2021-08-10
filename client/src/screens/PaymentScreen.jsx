import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Payment from '../components/Payment/Payment';
import logo from '../images/logo.png';
import classes from './screen.module.css';

const PaymentScreen = () => {
	return (
		<div className='px-4'>
			<img src={logo} alt='logo' className={classes.logo} />
			<Breadcrumb activeItem='payment' />
			<Payment />
		</div>
	);
};

export default PaymentScreen;
