import { Link } from 'react-router-dom';
import image from '../../images/pot.jpg';
import classes from './feature.module.css';

const Feature = () => {
	return (
		<div className={classes.feature}>
			<div className={classes.row}>
				<div className={classes.col}>
					<h2 className={classes.head}>
						fresh trees to make you pure refresh
					</h2>
					<p className={classes.text}>
						Make your home more natural, beautiful and clean.
					</p>
					<ul className={classes.list}>
						<li className={classes.item}>
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
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<span className={classes.bold}>Eco friendly</span>
							All eco-friendly materials, 0% CO2 emissions
						</li>

						<li className={classes.item}>
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
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<span className={classes.bold}>
								Long sustainable
							</span>
							a very long sustainable in home
						</li>
						<li className={classes.item}>
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
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<span className={classes.bold}>Refreshing</span>:
							Give Pure natural freshness
						</li>
						<li className={classes.item}>
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
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<span className={classes.bold}>Free delivery</span>:
							Get free delivery to your door
						</li>
					</ul>
					<Link to='/' className={classes.button}>
						Learn more
					</Link>
				</div>
				<div className={classes.col}>
					<img className={classes.image} src={image} alt='a tob' />
				</div>
			</div>
		</div>
	);
};

export default Feature;
