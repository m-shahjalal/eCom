const {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_FAIL,
	USER_LOGOUT,
	USER_DETAILS_RESET,
} = require('./types');
const userApi = require('../../api/user');

const actions = {};

actions.login = (info) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await userApi.login(info);
		if (data.error) {
			dispatch({ type: USER_LOGIN_FAIL, payload: data.error });
		}
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('user', JSON.stringify(data));
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_LOGIN_FAIL, payload });
	}
};

actions.register = (info) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const { data } = await userApi.register(info);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		localStorage.setItem('user', JSON.stringify(data));
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_REGISTER_FAIL, payload });
	}
};

actions.checkLogin = (token) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await userApi.checkLogin(token);
		if (data.error) {
			dispatch({ type: USER_LOGIN_FAIL, payload: data.error });
		}
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
	}
};

actions.logout = () => (dispatch) => {
	localStorage.removeItem('user');
	localStorage.removeItem('cart');
	localStorage.removeItem('address');
	localStorage.removeItem('payment');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	// todo: import order constraints
	// dispatch({ type: ORDER_LIST_MY_RESET });
	// todo: import order constraints
	// dispatch({ type: USER_LIST_RESET });
	document.location.href = '/login';
};

actions.userDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const { data } = await userApi.userDetails(id);
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const payload =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_DETAILS_FAIL, payload });
	}
};

actions.updateUser = (id, info) => async (dispatch) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });
		const { data } = await userApi.updateUser(id, info);
		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(actions.logout());
		}
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: message,
		});
	}
};

module.exports = actions;
