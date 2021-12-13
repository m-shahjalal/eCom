import * as adminApi from '../../api/admin';
import {
	ADMIN_ADD_PRODUCT_FAIL,
	ADMIN_ADD_PRODUCT_INITIAL,
	ADMIN_ADD_PRODUCT_REQUEST,
	ADMIN_ADD_PRODUCT_SUCCESS,
	ADMIN_DELETE_PRODUCT_FAIL,
	ADMIN_DELETE_PRODUCT_REQUEST,
	ADMIN_DELETE_PRODUCT_SUCCESS,
	ADMIN_MAKE_FAIL,
	ADMIN_MAKE_REQUEST,
	ADMIN_MAKE_SUCCESS,
	ADMIN_ORDERS_FAIL,
	ADMIN_ORDERS_REQUEST,
	ADMIN_ORDERS_SUCCESS,
	ADMIN_ORDER_DELETE_FAIL,
	ADMIN_ORDER_DELETE_REQUEST,
	ADMIN_ORDER_DELETE_SUCCESS,
	ADMIN_ORDER_UPDATE_FAIL,
	ADMIN_ORDER_UPDATE_REQUEST,
	ADMIN_ORDER_UPDATE_SUCCESS,
	ADMIN_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	ADMIN_UPDATE_PRODUCT_FAIL,
	ADMIN_UPDATE_PRODUCT_INITIAL,
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_USERS_FAIL,
	ADMIN_USERS_REQUEST,
	ADMIN_USERS_SUCCESS,
} from './types';

const actions = {};

actions.getUser = () => async (dispatch) => {
	dispatch({ type: ADMIN_USERS_REQUEST });
	try {
		const { data } = await adminApi.getUsers();
		dispatch({ type: ADMIN_USERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_USERS_FAIL, payload: error.message });
	}
};

actions.getProducts = () => async (dispatch) => {
	dispatch({ type: ADMIN_PRODUCTS_REQUEST });
	try {
		const { data } = await adminApi.getProducts();
		dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: error.message });
	}
};

actions.addProduct = (info) => async (dispatch) => {
	dispatch({ type: ADMIN_ADD_PRODUCT_REQUEST });
	try {
		const { data } = await adminApi.addProduct(info);
		dispatch({ type: ADMIN_ADD_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_ADD_PRODUCT_FAIL, payload: error.message });
	}
};

actions.addProductInitial = () => ({ type: ADMIN_ADD_PRODUCT_INITIAL });
actions.updateProductInitial = () => ({ type: ADMIN_UPDATE_PRODUCT_INITIAL });

actions.updateProduct = (id, info) => async (dispatch) => {
	dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });
	try {
		const { data } = await adminApi.updateProduct(id, info);
		dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_UPDATE_PRODUCT_FAIL, payload: error.message });
	}
};
actions.deleteProduct = (id) => async (dispatch, state) => {
	dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
	console.log(id);
	try {
		const result = state().adProduct.data.filter((i) => i._id !== id);
		const { data } = await adminApi.deleteProduct(id);
		dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: result });
		dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL, payload: error.message });
	}
};

actions.getOrders = () => async (dispatch) => {
	dispatch({ type: ADMIN_ORDERS_REQUEST });
	try {
		const { data } = await adminApi.getOrders();
		dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_ORDERS_FAIL, payload: error.message });
	}
};
actions.updateOrder = (id, info) => async (dispatch) => {
	dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });
	try {
		const { data } = await adminApi.updateOrder(id, info);
		dispatch({ type: ADMIN_ORDER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_ORDER_UPDATE_FAIL, payload: error.message });
	}
};
actions.deleteOrder = (id) => async (dispatch, state) => {
	dispatch({ type: ADMIN_ORDER_DELETE_REQUEST });
	try {
		const result = state().adOrders.data.filter((i) => i._id !== id);
		console.log(result);
		dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: result });
		const { data } = await adminApi.deleteOrder(id);
		dispatch({ type: ADMIN_ORDER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADMIN_ORDER_DELETE_FAIL, payload: error.message });
	}
};
actions.makeAdmin = (email) => async (dispatch) => {
	dispatch({ type: ADMIN_MAKE_REQUEST });
	try {
		const result = await adminApi.makeAdmin(email);
		dispatch({ type: ADMIN_MAKE_SUCCESS, payload: result.data });
	} catch (error) {
		dispatch({ type: ADMIN_MAKE_FAIL, payload: error.message });
	}
};

export default actions;
