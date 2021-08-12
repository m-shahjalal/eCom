import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Products from '../components/Products/Products';
import { getCategoryProducts } from '../store/product/action';
import classes from './screen.module.css';

const CategoryItems = () => {
	const dispatch = useDispatch();
	const category = useSelector((state) => state.category);
	const params = useParams();

	useEffect(() => {
		dispatch(getCategoryProducts(params.category));
		window.scrollTo({ behavior: 'smooth' });
	}, [dispatch, params]);
	return category.products.length > 0 ? (
		<Products products={category} title={params.category} />
	) : (
		<h2 className={classes.categoryLead}>
			there is no Product in{' '}
			<span className={classes.categoryGreen}>{params.category}</span>{' '}
			category
		</h2>
	);
};

export default CategoryItems;
