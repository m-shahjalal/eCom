import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/user/action';
import Router from './Router';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const token = (user && user.token) || false;
		if (token) dispatch(actions.checkLogin(token));
	}, [dispatch]);
	return <Router />;
};

export default App;
