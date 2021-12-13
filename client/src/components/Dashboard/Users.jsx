import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/admin/actions';
import classes from './Dashboard.module.css';

const Users = () => {
	const dispatch = useDispatch();
	const { loading, data, error } = useSelector((state) => state.adUsers);

	useEffect(() => {
		dispatch(actions.getUser());
	}, [dispatch]);
	return (
		<div className='container mx-auto'>
			{loading ? (
				<div className='loader'></div>
			) : error ? (
				<div className='text-4xl'>
					{error || 'Something went wrong.'}
				</div>
			) : data ? (
				<>
					<h1 className={classes.head}>Users</h1>
					<div className={classes.users}>
						<div className='flex w-full justify-around items-center border-b-2 border-green-400 mb-3 font-bold '>
							<span>name</span>
							<span>email</span>
						</div>
						{data?.map((user) => (
							<div key={user._id} product={user}>
								<div className='flex w-full justify-around items-center border-b mb-3 border-green-100'>
									<span className='mb-1'>{user.name}</span>
									<span>{user.email}</span>
								</div>
							</div>
						))}
					</div>
					<h1 className='text-3xl text-center font-bold mb-10 mt-4'>
						Total user: {data.length}
					</h1>
				</>
			) : null}
		</div>
	);
};

export default Users;
