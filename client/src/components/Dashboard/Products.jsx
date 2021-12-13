import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/admin/actions';
import classes from './Dashboard.module.css';
import Item from './Item';

const Products = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.adProduct);

	useEffect(() => {
		dispatch(actions.getProducts());
	}, [dispatch]);
	return (
		<div className='container mx-auto'>
			<h1 className={classes.head}>Manage products</h1>
			{loading ? (
				<div className='loader'></div>
			) : error ? (
				<div className='text-4xl py-10 px-4'>
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
