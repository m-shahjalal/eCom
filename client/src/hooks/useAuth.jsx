import { useSelector } from 'react-redux';

const useAuth = () => {
	return useSelector((state) => state.userAuth);
};

export default useAuth;
