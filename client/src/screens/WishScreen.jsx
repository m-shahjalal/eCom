import WishList from '../components/Wish/WishList';
import classes from './screen.module.css';

const WishScreen = () => {
	return (
		<div className={classes.wish}>
			<WishList />
		</div>
	);
};

export default WishScreen;
