import Sign from '../components/Register/Sign';
import { useLocation } from 'react-router';

const SignScreen = () => {
	const { state } = useLocation();
	return <Sign state={state} />;
};

export default SignScreen;
