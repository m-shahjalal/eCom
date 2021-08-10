import api from '../../api/products';
import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_POPULAR_FAIL,
	PRODUCT_POPULAR_REQUEST,
	PRODUCT_POPULAR_SUCCESS,
} from './types';

export const getProducts = (page, q) => {
	return async (dispatch) => {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		try {
			const { data } = await api.getProducts(page, q);
			dispatch({
				type: PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
		}
	};
};

export const productDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_DETAILS_REQUEST });
			const { data } = await api.getSingleProduct(id);
			dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: PRODUCT_DETAILS_FAIL });
		}
	};
};

export const getPopularProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_POPULAR_REQUEST });
			const { data } = await api.getPopularProduct();
			dispatch({ type: PRODUCT_POPULAR_SUCCESS, payload: data });
		} catch (e) {
			dispatch({ type: PRODUCT_POPULAR_FAIL, payload: e.message });
		}
	};
};
