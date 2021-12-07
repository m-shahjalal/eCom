import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const Private = ({ children }) => {
	let auth = useAuth();
	let location = useLocation();
	console.log(auth);
	if (auth.loading)
		return (
			<div className='py-32'>
				<div className='loader'></div>
			</div>
		);

	if (auth.isLoggedIn === false && auth.loading === false) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default Private;
