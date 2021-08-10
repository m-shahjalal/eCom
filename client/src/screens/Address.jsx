import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Edit from '../components/Ship/Edit';
import logo from '../images/logo.png';
import classes from './screen.module.css';

const Address = () => {
	return (
		<div className='px-4'>
			<img src={logo} alt='logo' className={classes.logo} />
			<Breadcrumb activeItem='ship' />
			<Edit />
		</div>
	);
};

export default Address;
