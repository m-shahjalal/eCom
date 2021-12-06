import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import classes from './nav.module.css';
import { useSelector } from 'react-redux';

const Nav = () => {
	const auth = useAuth();
	const [show, setShow] = useState(false);
	const cart = useSelector((state) => state.cart.items);
	const cardValue = cart.length || 0;
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
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
							</svg>
						</Link>
					</li>
				</ul>
				<div className={classes.right}>
					<div className={classes.user}>
						{auth.isLoggedIn ? (
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
						) : (
							<Link to='/signup' className={classes.link}>
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
						)}
					</div>
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
				</div>
			</nav>
		</div>
	);
};

export default Nav;
