import { combineReducers } from 'redux';
import adminReducer from './admin/reducer';
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

	adUsers: adminReducer.userReducer,
	adMakeAdmin: adminReducer.makeAdminReducer,

	adOrders: adminReducer.ordersReducer,
	adUpdateOrder: adminReducer.orderUpdateReducer,
	adDeleteOrder: adminReducer.orderDeleteReducer,

	adProduct: adminReducer.productsReducer,
	adUpdateProduct: adminReducer.updateProductReducer,
	adDeleteProduct: adminReducer.deleteProductReducer,
	adProductAdd: adminReducer.addProductReducer,
});

export default rootReducer;
