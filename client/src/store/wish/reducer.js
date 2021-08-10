import { ADD_TO_WISH, CLEAR_WISH, REMOVE_FROM_WISH } from './types';

const initialState = JSON.parse(localStorage.getItem('wish')) || [];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_WISH:
			return [...state, action.payload];
		case REMOVE_FROM_WISH:
			return state.filter((item) => item._id !== action.payload);
		case CLEAR_WISH:
			return [];
		default:
			return state;
	}
};

export default reducer;
