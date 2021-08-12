import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
} from './types';

const orderReducer = {};

orderReducer.orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};
		case ORDER_CREATE_FAIL:
			return {
				success: false,
				loading: false,
				error: action.payload,
			};
		case ORDER_CREATE_RESET:
			return {};
		default:
			return state;
	}
};
orderReducer.getOrders = (state = { list: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return { ...state, loading: true };
		case ORDER_LIST_SUCCESS:
			return { ...state, loading: false, list: action.payload };
		case ORDER_LIST_FAIL:
			return { list: [], loading: false, error: action.payload };
		default:
			return state;
	}
};
export default orderReducer;
