import {
	clearStorage,
	removeFromStorage,
	updateStorage,
} from '../../utils/storage';
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

export const addToCart = (payload) => {
	return async (dispatch, state) => {
		const same = state().cart.items.filter(
			(i) => i._id === payload._id
		).length;
		if (same) {
			updateStorage('cart', payload);
		} else {
			updateStorage('cart', payload);
			dispatch({ type: ADD_TO_CART, payload });
		}
	};
};

export const removeFromCart = (id) => {
	removeFromStorage('cart', id);
	return { type: REMOVE_FROM_CART, payload: id };
};

export const clearCart = () => {
	clearStorage('cart');
	return { type: CLEAR_CART };
};

export const incrementItem = (item) => {
	updateStorage('cart', { ...item, count: item.count + 1 });
	return { type: INCREMENT_QUANTITY, payload: item };
};

export const decrementItem = (item) => (dispatch, getState) => {
	const elem = getState().cart.items.filter(
		(elem) => elem._id === item._id
	)[0];

	if (elem.count > 1) {
		updateStorage('cart', { ...item, count: item.count - 1 });
		return dispatch({ type: DECREMENT_QUANTITY, payload: item });
	}
};

export const saveShippingAddress = (value) => {
	localStorage.setItem('address', JSON.stringify(value));
	return { type: SAVE_SHIPPING_ADDRESS, payload: value };
};

export const savePaymentMethod = (data) => (dispatch) => {
	localStorage.setItem('payment', JSON.stringify(data));
	return dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};
export const saveSubtotal = (data) => (dispatch) => {
	localStorage.setItem('subTotal', JSON.stringify(data));
	return dispatch({ type: CART_SUBTOTAL, payload: data });
};
