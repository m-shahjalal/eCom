import order from '../../api/order';
import { CLEAR_CART } from '../cart/types';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
} from './types';

const actions = {};

actions.createOrder = (value) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });
		const res = await order.placeOrder(value);
		if (res.data) {
			dispatch({ type: ORDER_CREATE_SUCCESS, payload: res.data });
			dispatch({ type: CLEAR_CART });
		}
	} catch (error) {
		console.log(error);
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
	}
};

export default actions;
