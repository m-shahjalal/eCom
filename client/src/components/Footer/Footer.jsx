import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import classes from './footer.module.css';

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Top: 0 takes us all the way back to the top of the page
	// Behavior: smooth keeps it smooth!
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		// Button is displayed after scrolling for 500 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);
	return (
		<>
			{isVisible && (
				<div className={classes.backTop} onClick={scrollToTop}>
					<svg
						className='w-8 h-8'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'
						/>
					</svg>
				</div>
			)}
			<div className={classes.container}>
				<footer className={classes.footer}>
					<div className={classes.row}>
						<div className={classes.col1}>
							<div className={classes.imageDiv}>
								<img
									src={logo}
									alt='logo'
									className={classes.image}
								/>
							</div>
							<p className={classes.logoText}>
								Your natural candle made for your home and for
								your wellness.
							</p>
						</div>
						<div className={classes.col2}>
							<div className={classes.cols}>
								<h4 className={classes.head}>Discover</h4>
								<ul className={classes.list}>
									<Link className={classes.link} to='#'>
										New session
									</Link>
									<Link className={classes.link} to='#'>
										Most searched
									</Link>
									<Link className={classes.link} to='#'>
										Most sold
									</Link>
								</ul>
							</div>
							<div className={classes.cols}>
								<h4 className={classes.head}>About</h4>
								<ul className={classes.list}>
									<Link className={classes.link} to='#'>
										Help
									</Link>
									<Link className={classes.link} to='#'>
										Shopping
									</Link>
									<Link className={classes.link} to='#'>
										Affiliate
									</Link>
								</ul>
							</div>
							<div className={classes.cols}>
								<h4 className={classes.head}>Help center</h4>
								<ul className={classes.list}>
									<Link className={classes.link} to='#'>
										Contact
									</Link>
									<Link className={classes.link} to='#'>
										Policies
									</Link>
									<Link className={classes.link} to='#'>
										Terms and Conditions
									</Link>
								</ul>
							</div>
						</div>
					</div>
				</footer>
			</div>
			<div className={classes.bottomContainer}>
				<div className={classes.bottom}>
					<div className={classes.copyright}>
						&copy; All rights reserved
					</div>
					<div className={classes.design}>
						Designed with 💛 by
						<a
							className={classes.externalLink}
							rel='noreferrer'
							href='http://facebook.com/lx.shahjalal'
							target='_blank'>
							Shahjalal
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
