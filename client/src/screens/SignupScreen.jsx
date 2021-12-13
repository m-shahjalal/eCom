import { useLocation } from 'react-router';
import Sign from '../components/Register/Sign';

const SignScreen = () => {
	const { state } = useLocation();
	return <Sign state={state} />;
};

export default SignScreen;
