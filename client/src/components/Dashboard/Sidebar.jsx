import React from 'react';
import { HiX } from 'react-icons/hi';
import { ImUserTie } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { links } from './data';

let activeStyle = {
	backgroundColor: 'rgba(52, 211, 153, 1)',
	color: 'white',
};

const Sidebar = ({ open, setOpen }) => {
	const { user } = useAuth();
	return (
		<div
			className={`transition-all  duration-500  fixed top-0 ${
				open ? 'left-0' : '-left-64'
			}`}>
			<div className='flex h-screen overflow-y-auto flex-col bg-green-50  w-64 px-4 py-8 border-r min-h-screen relative z-50'>
				<button
					onClick={() => setOpen(false)}
					className='absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800'>
					<HiX className='w-5 h-5' />
				</button>
				<h2 className='text-3xl font-semibold text-gray-800'>
					HOMY <small className='font-light text-sm'>admin</small>
				</h2>

				<div className='flex flex-col mt-6  justify-between flex-1'>
					<nav className='text'>
						{links.map((link, index) => {
							const { id, url, text, icon } = link;
							return (
								<NavLink
									key={id}
									to={url}
									style={({ isActive }) =>
										text !== 'Dashboard' && isActive
											? activeStyle
											: undefined
									}
									onClick={() => setOpen(false)}
									className={`capitalize flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform rounded-md`}>
									{icon}
									<span className='mx-4 font-medium'>
										{text}
									</span>
								</NavLink>
							);
						})}
						<hr className='my-6' />
					</nav>
					<Link
						to='/profile'
						className='flex items-center px-4 -mx-2 mt-5'>
						<ImUserTie className='w-5 h-5 ml-4' />
						<h4 className='mx-2 font-medium text-gray-800 hover:underline cursor-pointer'>
							{user?.name || 'account'}
						</h4>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
