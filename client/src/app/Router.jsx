import { Route, Routes, useLocation } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import Products from '../components/Dashboard/Products';
import MakeAdmin from '../components/Dashboard/MakeAdmin';
import Orders from '../components/Dashboard/Orders';
import Dashboard from '../components/Dashboard/Dashboard';

import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import AboutScreen from '../screens/AboutScreen';
import Address from '../screens/Address';
import AdminScreen from '../screens/AdminScreen';
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
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ShippingScreen from '../screens/ShippingScreen';
import SignScreen from '../screens/SignupScreen';
import ThanksScreen from '../screens/ThanksScreen';
import WishScreen from '../screens/WishScreen';
import Admin from './Admin';
import classes from './app.module.css';
import Private from './Private';
import Users from '../components/Dashboard/Users';

const Router = () => {
	const { pathname } = useLocation();
	return (
		<div className={classes.main}>
			{pathname !== '/login' &&
				pathname !== '/signup' &&
				pathname !== '/completed' &&
				pathname !== '/shipping' &&
				pathname !== '/admin' &&
				pathname !== '/admin/products' &&
				pathname !== '/admin/add-product' &&
				pathname !== '/admin/make-admin' &&
				pathname !== '/admin/orders' &&
				pathname !== '/admin/users' &&
				pathname !== '/place-order' &&
				pathname !== '/payment' && <Nav />}
			<Routes>
				<Route path='/signup' element={<SignScreen />} />
				<Route path='/login' element={<LoginScreen />} />

				<Route path='/' element={<HomeScreen />} />
				<Route path='/contact-us' element={<ContactScreen />} />
				<Route path='/search' element={<SearchScreen />} />
				<Route path='/about' element={<AboutScreen />} />
				<Route path='/category' element={<CategoryScreen />} />
				<Route path='/category/:category' element={<CategoryItems />} />
				<Route path='/cart' element={<CartScreen />} />
				<Route path='/wish-list' element={<WishScreen />} />
				<Route path='/products/:id' element={<ItemScreen />} />

				<Route
					path='/profile'
					element={
						<Private>
							<ProfileScreen />
						</Private>
					}
				/>
				<Route
					path='/shipping'
					element={
						<Private>
							<ShippingScreen />
						</Private>
					}
				/>
				<Route
					path='/shipping/address'
					element={
						<Private>
							<Address />
						</Private>
					}
				/>
				<Route
					path='/payment'
					element={
						<Private>
							<PaymentScreen />
						</Private>
					}
				/>
				<Route
					path='/place-order'
					element={
						<Private>
							<PlaceOrderScreen />
						</Private>
					}
				/>
				<Route
					path='/completed'
					element={
						<Private>
							<ThanksScreen />
						</Private>
					}
				/>
				<Route
					path='/profile/edit'
					element={
						<Private>
							<ProfileEdit />
						</Private>
					}
				/>
				<Route
					path='/orders/:id'
					element={
						<Private>
							<OrderDetail />
						</Private>
					}
				/>

				<Route
					path='/admin'
					element={
						<Admin>
							<AdminScreen />
						</Admin>
					}>
					<Route path='' element={<Dashboard />} />
					<Route path='orders' element={<Orders />} />
					<Route path='products' element={<Products />} />
					<Route path='add-product' element={<AddProduct />} />
					<Route path='make-admin' element={<MakeAdmin />} />
					<Route path='users' element={<Users />} />
				</Route>

				<Route path='*' element={<Error />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default Router;
