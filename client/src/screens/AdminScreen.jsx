import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import actions from '../store/user/action';
import classes from './screen.module.css';
import { IoMdLogOut } from 'react-icons/io';

import Sidebar from '../components/Dashboard/Sidebar';
import Orders from '../components/Dashboard/Orders';
import Home from '../components/Dashboard/Products';

const AdminScreen = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () => {
		dispatch(actions.logout());
		navigate('/login', { replace: true });
	};

	return (
		<>
			<div className={classes.nav}>
				<button
					onClick={() => setOpen(true)}
					className={`${open ? '-translate-x-8' : 'translate-x-0'} ${
						classes.openButton
					}`}>
					<FaBars className='w-6 h-6' />
				</button>
				<Link to='/' className={classes.adminLogo}>
					HOMY{' '}
					<small className='font-light text-sm hidden sm:inline'>
						admin
					</small>
				</Link>
				<button onClick={logOut} className={classes.link}>
					<IoMdLogOut size='24px' />
					<span className='mx-2'>LOGOUT</span>
				</button>
			</div>
			<Sidebar open={open} setOpen={setOpen} />

			<Outlet />
		</>
	);
};

export default AdminScreen;
