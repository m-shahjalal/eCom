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
	USER_UPDATE_RESET,
} = require('./types');

const userReducer = {};

userReducer.loginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, user: {}, error: action.payload };
		case USER_LOGOUT:
			return { user: {} };
		default:
			return state;
	}
};

userReducer.registerReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

userReducer.userDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload.user,
				profile: action.payload.profile,
			};
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state;
	}
};

userReducer.updateReducer = (state = { success: false }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_RESET:
			return {
				user: {},
			};
		default:
			return state;
	}
};

module.exports = userReducer;
