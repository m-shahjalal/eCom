import {
	ADD_TO_CART,
	CART_SUBTOTAL,
	CLEAR_CART,
	DECREMENT_QUANTITY,
	INCREMENT_QUANTITY,
	REMOVE_FROM_CART,
	SAVE_PAYMENT_METHOD,
	SAVE_SHIPPING_ADDRESS,
} from './types';

const initialState = {
	items: JSON.parse(localStorage.getItem('cart')) || [],
	address: JSON.parse(localStorage.getItem('address')) || {},
	payment: JSON.parse(localStorage.getItem('payment')) || {},
	subTotal: JSON.parse(localStorage.getItem('subTotal')) || 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return { ...state, items: [...state.items, action.payload] };
		case REMOVE_FROM_CART:
			return {
				...state,
				items: state.items.filter(
					(item) => item._id !== action.payload
				),
			};
		case CLEAR_CART:
			return { ...state, items: [] };
		case INCREMENT_QUANTITY:
			let incState = state.items.slice();
			const incIndex = incState.findIndex(
				(i) => i._id === action.payload._id
			);
			const item = {
				...state.items[incIndex],
				count: state.items[incIndex].count + 1,
			};
			incState.splice(incIndex, 1, item);
			return { ...state, items: incState };

		case DECREMENT_QUANTITY:
			let decState = state.items.slice();
			const decIndex = decState.findIndex(
				(i) => i._id === action.payload._id
			);
			if (state.items[decIndex].count > 0) {
				const item = {
					...state.items[decIndex],
					count: state.items[decIndex].count - 1,
				};
				decState.splice(decIndex, 1, item);
			}
			return { ...state, items: decState };
		case SAVE_SHIPPING_ADDRESS:
			return { ...state, address: action.payload };
		case SAVE_PAYMENT_METHOD:
			return { ...state, payment: action.payload };
		case CART_SUBTOTAL:
			return { ...state, subTotal: action.payload };
		default:
			return state;
	}
};

export default reducer;
