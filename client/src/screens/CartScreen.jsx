import Cart from '../components/Cart/Cart';
import classes from './screen.module.css';

const CartScreen = () => {
	return (
		<div className={classes.cart}>
			<Cart />
		</div>
	);
};

export default CartScreen;
