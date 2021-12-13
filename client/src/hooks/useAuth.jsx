import { useSelector } from 'react-redux';

const useAuth = () => {
	const userAuth = useSelector((state) => state.userAuth);
	return { ...userAuth, loading: false };
};

export default useAuth;
