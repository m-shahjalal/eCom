import { combineReducers } from 'redux';
import cartReducer from './cart/reducer';
import orderReducer from './order/reducer';
import productReducer from './product/reducer';
import userReducer from './user/reducer';
import wishReducer from './wish/reducer';

const rootReducer = combineReducers({
	products: productReducer.productList,
	product: productReducer.productDetails,
	category: productReducer.getCategoryProducts,
	popular: productReducer.popularProducts,
	userLogin: userReducer.loginReducer,
	userSignup: userReducer.registerReducer,
	userDetails: userReducer.userDetailsReducer,
	userUpdate: userReducer.updateReducer,
	orderCreate: orderReducer.orderCreateReducer,
	orders: orderReducer.getOrders,
	cart: cartReducer,
	wish: wishReducer,
});

export default rootReducer;
