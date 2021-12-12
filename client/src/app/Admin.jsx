import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Admin = ({ children }) => {
	let { isLoggedIn, loading, user } = useAuth();
	let location = useLocation();

	if (loading) {
		return (
			<div className='py-32'>
				<div className='loader'></div>
			</div>
		);
	} else if (!isLoggedIn && loading === false) {
		return <Navigate to='/login' state={{ from: location }} />;
	} else if (!user.admin) {
		return <Navigate to='/' state={{ from: location }} />;
	} else {
		return children;
	}
};

export default Admin;
