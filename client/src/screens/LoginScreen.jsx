import { useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import Login from '../components/Login/Login';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const url = `${state?.goto ? state.goto : '/profile'}`;
	const { isLoggedIn } = useAuth();
	useEffect(
		() => isLoggedIn && navigate(url, { replace: true }),
		[isLoggedIn, navigate, url]
	);

	return <Login state={state} />;
};

export default LoginScreen;
