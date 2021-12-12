import classes from './Dashboard.module.css';
import Item from './Item';
import actions from '../../store/admin/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Products = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.adProduct);

	useEffect(() => {
		dispatch(actions.getProducts());
	}, [dispatch]);
	return (
		<div className='container mx-auto'>
			{loading ? (
				<div className='loader'></div>
			) : error ? (
				<div className='text-4xl'>
					{error || 'Something went wrong.'}
				</div>
			) : data ? (
				<div className={classes.products}>
					{data?.map((product) => (
						<Item key={product._id} product={product} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default Products;
