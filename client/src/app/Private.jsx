import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const Private = ({ children }) => {
	let auth = useAuth();
	let location = useLocation();

	if (auth.loading)
		return (
			<div>
				<div className='loader'></div>
			</div>
		);

	if (auth.isLoggedIn === false) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default Private;
