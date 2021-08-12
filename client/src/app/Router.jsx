import { BrowserRouter as BRouter, Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import AboutScreen from '../screens/AboutScreen';
import Address from '../screens/Address';
import CartScreen from '../screens/CartScreen';
import CategoryItems from '../screens/CategoryItems';
import CategoryScreen from '../screens/CategoryScreen';
import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderDetail from '../screens/OrderDetail';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import ProfileEdit from '../screens/ProfileEdit';
import profileScreen from '../screens/profileScreen';
import ShippingScreen from '../screens/ShippingScreen';
import SignScreen from '../screens/SignupScreen';
import ThanksScreen from '../screens/ThanksScreen';
import WishScreen from '../screens/WishScreen';
import classes from './app.module.css';

const Router = () => {
	return (
		<BRouter>
			<Switch>
				<Route exact path='/signup' component={SignScreen} />
				<Route exact path='/login' component={LoginScreen} />
				<Route exact path='/completed' component={ThanksScreen} />
				<Route exact path='/shipping' component={ShippingScreen} />
				<Route exact path='/shipping/address' component={Address} />
				<Route exact path='/payment' component={PaymentScreen} />
				<Route exact path='/place-order' component={PlaceOrderScreen} />
				<div className={classes.main}>
					<Nav />
					<Route exact path='/' component={HomeScreen} />
					<Route exact path='/products/:id' component={ItemScreen} />
					<Route exact path='/category' component={CategoryScreen} />
					<Route exact path='/wish-list' component={WishScreen} />
					<Route exact path='/cart' component={CartScreen} />
					<Route exact path='/about' component={AboutScreen} />
					<Route exact path='/contact-us' component={ContactScreen} />
					<Route exact path='/profile' component={profileScreen} />
					<Route exact path='/profile/edit' component={ProfileEdit} />
					<Route exact path='/orders/:id' component={OrderDetail} />
					<Route
						exact
						path='/category/:category'
						component={CategoryItems}
					/>
					<Footer />
				</div>
				<Route component={Error} />
			</Switch>
		</BRouter>
	);
};

export default Router;
