import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import classes from './nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/user/action';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { BiCategory, BiLockAlt } from 'react-icons/bi';

const Nav = () => {
	const auth = useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const cart = useSelector((state) => state.cart.items);
	const cardValue = cart.length || 0;
	const logOut = () => {
		dispatch(actions.logout());
		navigate('/login', { replace: true });
	};
	return (
		<div className={classes.container}>
			<nav className={classes.nav}>
				<div
					className={classes.hamburger}
					onClick={() => setShow(!show)}>
					{show ? (
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					)}
				</div>
				<Link to='/' className={classes.logo}>
					<img src={logo} className={classes.logoImg} alt='logo' />
				</Link>
				<ul
					className={
						show ? `${classes.list} ${classes.show}` : classes.list
					}
					onClick={() => setShow(false)}>
					<li className={classes.item}>
						<Link to='/category' className={classes.link}>
							<BiCategory
								size='20px'
								className='mr-1'
								style={{ marginTop: '2px' }}
							/>
							category
						</Link>
					</li>

					<li className={classes.item}>
						<Link to='about' className={classes.link}>
							About
						</Link>
					</li>
					<li className={classes.item}>
						<Link to='contact-us' className={classes.link}>
							Contact
						</Link>
					</li>

					<li className={classes.item}>
						<Link to='search' className={classes.link}>
							<HiOutlineDocumentSearch size='24px' />
						</Link>
					</li>
					{auth.isLoggedIn && (
						<li className={classes.item}>
							<Link to='/profile' className={classes.link}>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>
							</Link>
						</li>
					)}
				</ul>
				<div className={classes.right}>
					<div className={classes.user}>
						{auth.isLoggedIn ? (
							<>
								{auth.user?.admin && (
									<Link to='/admin' className={classes.link}>
										<BiLockAlt
											size='24px'
											className='mr-1 text-green-600'
										/>
										<span
											className='text-green-600'
											style={{ marginTop: '1px' }}>
											Admin
										</span>
									</Link>
								)}
								<button
									onClick={logOut}
									className={classes.link}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
								</button>
							</>
						) : (
							<Link to='/signup' className={classes.link}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</Link>
						)}
					</div>
					{!auth.user?.admin ? (
						<div className={classes.cart}>
							<Link to='/cart' className={classes.link}>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
									/>
								</svg>
								{cardValue > 0 && (
									<div className={classes.cardValue}>
										{cardValue}
									</div>
								)}
							</Link>
						</div>
					) : null}
				</div>
			</nav>
		</div>
	);
};

export default Nav;
