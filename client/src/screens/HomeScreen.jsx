import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feature from '../components/Feature/Feature';
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Products from '../components/Products/Products';
import Testimonial from '../components/Testimonial/Testimonial';
import { getProducts } from '../store/product/action';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProducts());
		window.scrollTo({ behavior: 'smooth' });
	}, [dispatch]);
	return (
		<>
			<Hero />
			<Products title='Products' products={products} />
			<Feature />
			<Testimonial />
			<Popular />
		</>
	);
};

export default HomeScreen;
