import axios from '../utils/axios';
const order = {};

order.placeOrder = (value) => {
	return axios.post('/orders', value);
};

export default order;
