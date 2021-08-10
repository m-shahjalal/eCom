import { useDispatch, useSelector } from 'react-redux';
import { clearWish } from '../../store/wish/action';
import Card from '../Card/Card';
import classes from './wish.module.css';

const WishList = () => {
	const wish = useSelector((state) => state.wish);
	const dispatch = useDispatch();
	const clearList = () => dispatch(clearWish());
	return (
		<>
			<h3 className={classes.head}>
				{wish.length > 0
					? 'Your wishlist items'
					: 'No wishlist items yet!'}
			</h3>
			<div className={classes.wish}>
				<div className={classes.list}>
					{wish.map((item) => (
						<Card product={item} key={item._id} wishlist />
					))}
				</div>
			</div>
			{wish.length > 0 && (
				<button className={classes.button} onClick={() => clearList()}>
					Clear all wishlist
				</button>
			)}
		</>
	);
};

export default WishList;
