import classes from './error.module.css';

const Error = () => {
	return (
		<div className={classes.error}>
			<svg
				className='w-12 h-12'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
			<h1 className={classes.head}>Page not found</h1>
		</div>
	);
};

export default Error;
