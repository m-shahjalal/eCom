import { useSelector } from 'react-redux';

const useAuth = () => {
	const userAuth = useSelector((state) => state.userAuth);
	return userAuth;
};

export default useAuth;
