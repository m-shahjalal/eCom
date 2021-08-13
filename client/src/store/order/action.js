import order from '../../api/order';
import { CLEAR_CART } from '../cart/types';
import action from '../user/action';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
} from './types';

const actions = {};

actions.createOrder = (value) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });
		const res = await order.placeOrder(value);
		if (typeof res.data === 'object') {
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: res.data });
			dispatch({ type: CLEAR_CART });
		} else {
			dispatch({ type: ORDER_CREATE_FAIL, payload: res.data });
		}
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
	}
};

actions.orders = () => async (dispatch) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const res = await order.getOrders();
		if (!Array.isArray(res.data)) {
			return dispatch(action.logout());
		}
		dispatch({ type: ORDER_LIST_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch(action.logout());
		dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
	}
};

export default actions;
