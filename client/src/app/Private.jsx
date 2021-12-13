import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const Private = ({ children }) => {
	let { isLoggedIn, loading } = useAuth();
	let location = useLocation();
	if (loading) {
		return (
			<div className='py-32'>
				<div className='loader'></div>
			</div>
		);
	} else if (!isLoggedIn && loading === false) {
		return <Navigate replace to='/login' state={{ from: location }} />;
	} else {
		return children;
	}
};

export default Private;
