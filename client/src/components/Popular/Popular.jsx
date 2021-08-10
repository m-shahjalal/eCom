import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularProducts } from '../../store/product/action';
import Card from '../Card/Card';
import classes from './popular.module.css';

const Popular = () => {
	const popular = useSelector((state) => state.popular);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPopularProducts());
	}, [dispatch]);
	return (
		<div className={classes.popular}>
			<h2 className={classes.head}>Popular</h2>
			<p className={classes.text}>
				Our top selling product that you may like
			</p>
			<div className={classes.row}>
				{popular.error ? (
					<div className={classes.error}> 🏓 {popular.error}</div>
				) : popular.loading ? (
					<div className={classes.loading}>
						<div className='loader'></div>
					</div>
				) : (
					popular.products?.map((item) => (
						<Card key={item._id} product={item} />
					))
				)}
			</div>
		</div>
	);
};

export default Popular;
