import Sign from '../components/Register/Sign';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const SignScreen = () => {
	const { state } = useLocation();
	return <Sign state={state} />;
};

export default SignScreen;
