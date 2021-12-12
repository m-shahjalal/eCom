import {
	ADMIN_ADD_PRODUCT_FAIL,
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
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_USERS_FAIL,
	ADMIN_USERS_REQUEST,
	ADMIN_USERS_SUCCESS,
} from './types';

const reducer = {};

reducer.userReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_USERS_REQUEST:
			return { loading: true };
		case ADMIN_USERS_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_USERS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.ordersReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_ORDERS_REQUEST:
			return { loading: true };
		case ADMIN_ORDERS_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_ORDERS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.orderUpdateReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_ORDER_UPDATE_REQUEST:
			return { loading: true };
		case ADMIN_ORDER_UPDATE_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_ORDER_UPDATE_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.orderDeleteReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_ORDER_DELETE_REQUEST:
			return { loading: true };
		case ADMIN_ORDER_DELETE_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_ORDER_DELETE_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.productsReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_PRODUCTS_REQUEST:
			return { loading: true };
		case ADMIN_PRODUCTS_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_PRODUCTS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.addProductReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_ADD_PRODUCT_REQUEST:
			return { loading: true };
		case ADMIN_ADD_PRODUCT_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_ADD_PRODUCT_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.updateProductReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_UPDATE_PRODUCT_REQUEST:
			return { loading: true };
		case ADMIN_UPDATE_PRODUCT_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_UPDATE_PRODUCT_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

reducer.deleteProductReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_DELETE_PRODUCT_REQUEST:
			return { loading: true };
		case ADMIN_DELETE_PRODUCT_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_DELETE_PRODUCT_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};
reducer.makeAdminReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ADMIN_MAKE_REQUEST:
			return { loading: true };
		case ADMIN_MAKE_SUCCESS:
			return { loading: false, data: payload };
		case ADMIN_MAKE_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

export default reducer;
