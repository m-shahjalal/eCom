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
	userAuth: userReducer.loginReducer,
	userSignup: userReducer.registerReducer,
	userDetails: userReducer.userDetailsReducer,
	orderCreate: orderReducer.orderCreateReducer,
	productReview: productReducer.reviewCreateReducer,
	orders: orderReducer.getOrders,
	cart: cartReducer,
	wish: wishReducer,
});

export default rootReducer;
