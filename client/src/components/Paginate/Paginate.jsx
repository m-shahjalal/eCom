import { useDispatch } from 'react-redux';
import { getProducts } from '../../store/product/action';
import classes from './paginate.module.css';

export default function Paginate({ totalPage, currentPage }) {
	const dispatch = useDispatch();
	const homeHandler = () => {
		return dispatch(getProducts(1));
	};
	const previousPage = () => {
		return dispatch(getProducts(currentPage - 1));
	};
	const nextPage = () => {
		return dispatch(getProducts(currentPage + 1));
	};
	return (
		<div className={classes.paginate}>
			<div className={classes.text}>
				Showing{' '}
				<span className='font-medium text-lg'>{currentPage}</span> of{' '}
				<span className='font-medium text-lg'>{totalPage}</span> pages
			</div>
			<div className={classes.row}>
				<button
					className={classes.link}
					onClick={previousPage}
					disabled={currentPage === 1}>
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
							d='M7 16l-4-4m0 0l4-4m-4 4h18'
						/>
					</svg>
					Previous
				</button>
				<button
					className={
						currentPage === 1
							? `${classes.homeLink} ${classes.active}`
							: `${classes.homeLink}`
					}
					onClick={homeHandler}>
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
							d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
						/>
					</svg>
				</button>
				<button
					className={classes.link}
					onClick={nextPage}
					disabled={currentPage === totalPage}>
					Next
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
							d='M17 8l4 4m0 0l-4 4m4-4H3'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
