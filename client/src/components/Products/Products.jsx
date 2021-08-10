import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/product/action';
import Card from '../Card/Card';
import Paginate from '../Paginate/Paginate';
import classes from './products.module.css';

const Products = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProducts());
		window.scrollTo({ behavior: 'smooth' });
	}, [dispatch]);

	return (
		<>
			<h1 className={classes.lead} id='products'>
				Products
			</h1>
			<p className={classes.text}>
				Order it for you or for your beloved ones
			</p>
			{products.loading && (
				<div className={classes.loading}>
					<div className='loader'></div>
				</div>
			)}
			<div className={classes.products}>
				{products?.products?.map((product) => (
					<Card key={product._id} popular product={product} />
				))}
			</div>
			{products && products.pages > 1 && (
				<Paginate
					totalPage={products.pages}
					currentPage={products.page}
				/>
			)}
			{products && products.error && (
				<div className={classes.error}> ⭕ {products.error}</div>
			)}
		</>
	);
};

export default Products;
