import {
	addToStorage,
	clearStorage,
	removeFromStorage,
} from '../../utils/storage';
import { ADD_TO_WISH, CLEAR_WISH, REMOVE_FROM_WISH } from './types';

export const addToWish = (item) => {
	addToStorage('wish', item);
	return { type: ADD_TO_WISH, payload: item };
};
export const removeFromWish = (id) => {
	removeFromStorage('wish', id);
	return { type: REMOVE_FROM_WISH, payload: id };
};
export const clearWish = () => {
	clearStorage('wish');
	return { type: CLEAR_WISH };
};
