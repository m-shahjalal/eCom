import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, logout } from '../store/user/action';
import Router from './Router';

const App = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const token = (user && user.token) || false;
		if (token) dispatch(checkLogin(token));
	}, [dispatch]);
	useEffect(() => {
		if (typeof userLogin.user === 'string') {
			dispatch(logout());
		}
	}, [userLogin.user, dispatch]);
	return <Router />;
};

export default App;
