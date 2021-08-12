import api from '../../api/products';
import {
	CLEAR_CATEGORY,
	PRODUCT_CATEGORY_FAIL,
	PRODUCT_CATEGORY_REQUEST,
	PRODUCT_CATEGORY_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
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

export const getCategoryProducts = (category) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_CATEGORY_REQUEST });
		const { data } = await api.getCategory(category);
		dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
	}
};

export const reviewCreate = (id, info) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
		const { data } = await api.createReview(id, info);
		if (data.error) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: data.error,
			});
		} else {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
				payload: data.success,
			});
		}
	} catch (err) {
		dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: err.message });
	}
};

export const searchProducts = (keywords) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_CATEGORY_REQUEST });
		const res = await api.searchProducts(keywords);
		dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
	}
};

export const clearCategory = () => {
	return { type: CLEAR_CATEGORY };
};
