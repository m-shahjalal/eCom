import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../components/Products/Products';
import { searchProducts } from '../store/product/action';
import classes from './screen.module.css';

const SearchScreen = () => {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
		value && dispatch(searchProducts(value));
	};

	useEffect(() => {
		let time;
		if (Boolean(value))
			time = setTimeout(() => dispatch(searchProducts(value)), 600);
		return () => clearTimeout(time);
	}, [value, dispatch]);

	return (
		<div className={classes.search}>
			<form onSubmit={submitHandler} className={classes.searchInput}>
				<input
					onChange={(e) => setValue(e.target.value)}
					value={value}
					type='text'
					className={classes.Input}
					placeholder='Search what you looking for...'
				/>
				<button
					type='submit'
					className={
						category.loading
							? `${classes.searchButton} ${classes.glob}`
							: `${classes.searchButton}`
					}>
					🌎
				</button>
			</form>
			{category.products.length > 0 ? (
				<Products products={category} title={value} />
			) : category.loading ? (
				<div className='loader'></div>
			) : !Boolean(value) ? (
				<h2 className={classes.categoryLead}>
					Type something to search
				</h2>
			) : (
				<h2 className={classes.categoryLead}>
					there is no Product with{' '}
					<span className={classes.categoryGreen}>{value}</span>
				</h2>
			)}
		</div>
	);
};

export default SearchScreen;
