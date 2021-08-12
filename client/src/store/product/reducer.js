import {
	CLEAR_CATEGORY,
	PRODUCT_CATEGORY_FAIL,
	PRODUCT_CATEGORY_REQUEST,
	PRODUCT_CATEGORY_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
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

const reducer = {};

reducer.productList = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true };
		case PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

reducer.productDetails = (state = { product: { reviews: [] } }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

reducer.reviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true, success: false };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: action.payload };
		case PRODUCT_CREATE_REVIEW_FAIL:
			return { loading: false, success: false, error: action.payload };
		case PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

reducer.popularProducts = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_POPULAR_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_POPULAR_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_POPULAR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

reducer.getCategoryProducts = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_CATEGORY_REQUEST:
			return { products: [], loading: true };
		case PRODUCT_CATEGORY_SUCCESS:
			return { ...state, loading: false, products: action.payload };
		case PRODUCT_CATEGORY_FAIL:
			return { ...state, loading: false, error: action.payload };
		case CLEAR_CATEGORY:
			return { products: [] };
		default:
			return state;
	}
};
export default reducer;
