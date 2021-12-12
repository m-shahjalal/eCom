import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actions from '../../store/admin/actions';

const MakeAdmin = () => {
	const [email, setEmail] = useState('');
	const { loading, data, error } = useSelector((state) => state.adMakeAdmin);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => data && data?.success && setEmail(''), [navigate, data]);
	return (
		<div className='flex justify-center items-start pt-32 bg-gray-700 h-screen'>
			<div className='bg-white p-10 rounded-xl'>
				<h1 className='text-center text-2xl font-semibold text-gray-500'>
					Make a New Admin
				</h1>
				{data?.success && (
					<div className='text-center text-green-600 mt-4'>
						Admin successfully created
					</div>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(actions.makeAdmin(email));
					}}
					className='mt-8'>
					<div className='flex justify-center  py-2 px-6 rounded-xl'>
						<input
							type='email'
							placeholder='Give The Email of User'
							className='outline-none text-gray-700 text-lg border-b-2'
							value={email || ''}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button
							type='submit'
							className='bg-green-400 min-w-min text-green-50 font-semibold px-6 py-2 rounded-xl text-md flex justify-center items-center'>
							{loading && <span className='loader-sm'></span>}
							<span className='mx-2'>
								{loading ? 'Loading...' : 'confirm admin'}
							</span>
						</button>
					</div>
					{error && (
						<div className='text-center text-red-600 mt-4'>
							{error || 'something went wrong'}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default MakeAdmin;
