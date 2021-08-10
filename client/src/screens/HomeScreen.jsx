import Feature from '../components/Feature/Feature';
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Products from '../components/Products/Products';
import Testimonial from '../components/Testimonial/Testimonial';

const HomeScreen = () => {
	return (
		<>
			<Hero />
			<Products />
			<Feature />
			<Testimonial />
			<Popular />
		</>
	);
};

export default HomeScreen;
