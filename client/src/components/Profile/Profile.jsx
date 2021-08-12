import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import image from '../../images/notUser.svg';
import { getUserDetails, logout } from '../../store/user/action';
import classes from './profile.module.css';
import Table from './Table';

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userDetails = useSelector((state) => state.userDetails);
	const orders = useSelector((state) => state.orders);
	const { profile } = userDetails;
	const user = JSON.parse(localStorage.getItem('user')) || {};
	const { id } = user;
	if (!id) history.push('/login');
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		dispatch(getUserDetails(id));
	}, [dispatch, history, id]);

	const logOut = () => {
		dispatch(logout());
	};

	return (
		<div className={classes.profile}>
			{userDetails.profile ? (
				<div className={classes.topSection}>
					{/* <!-- Left Side --> */}
					<div className={classes.left}>
						<div className={classes.card}>
							<div className={classes.imgDiv}>
								<img
									className={classes.thumb}
									src={profile.thumb}
									alt={profile.name}
								/>
							</div>
							<div className={classes.cardDetails}>
								<h1 className={classes.name}>{profile.name}</h1>
								<h3 className={classes.tagline}>
									{profile.tagline}
								</h3>
								<button
									className={classes.userLogout}
									onClick={logOut}>
									logout
								</button>
							</div>
						</div>
					</div>

					{/* <!-- Right Side --> */}
					<div className={classes.right}>
						<div className={classes.about}>
							<div className={classes.topLine}>
								<span className='text-green-500'>
									<svg
										className='h-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
										/>
									</svg>
								</span>
								<span className={classes.track}>About</span>
							</div>
							<div className={classes.box}>
								<div className={classes.aboutGrid}>
									<div className={classes.aboutKey}>
										Contact No.
									</div>
									<div className={classes.aboutValue}>
										{profile.contact}
									</div>
								</div>

								<div className={classes.aboutGrid}>
									<div className={classes.aboutKey}>
										Address
									</div>
									<div className={classes.aboutValue}>
										{`${profile.address.line} ${profile.address.city} ${profile.address.country} -${profile.address.zipcode}`}
									</div>
								</div>
								<div className={classes.aboutGrid}>
									<div className={classes.aboutKey}>
										Email.
									</div>
									<div className={classes.aboutValue}>
										<a
											className='text-green-600'
											href={`mailto:${profile.email}`}>
											{profile.email}
										</a>
									</div>
								</div>
							</div>
							<Link
								to={{
									pathname: '/profile/edit',
									state: { ...profile, id },
								}}
								className={classes.button}>
								Edit profile
							</Link>
						</div>
					</div>
				</div>
			) : userDetails.loading ? (
				<div className='loader'></div>
			) : (
				<div className={classes.notUser}>
					<div className={classes.imageDiv}>
						<img src={image} alt='user' />
					</div>
					<h2 className={classes.notUserLead}>
						You don't have account yet
					</h2>
					<div className={classes.buttonDiv}>
						<Link
							to={{
								pathname: '/profile/edit',
								state: { ...profile, id },
							}}
							className={classes.createButton}>
							create account
						</Link>
						<button
							onClick={logOut}
							className={classes.logoutButton}>
							log out
						</button>
					</div>
				</div>
			)}
			{/* Order sections */}
			<Table orders={orders} />
		</div>
	);
};

export default Profile;
