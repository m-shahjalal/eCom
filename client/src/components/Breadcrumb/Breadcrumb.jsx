import classes from './breadcrumb.module.css';

const Breadcrumb = ({ activeItem }) => {
	return (
		<ul className={classes.breadcrumb}>
			<li
				className={
					activeItem === 'cart'
						? `${classes.item} ${classes.activeFirst}`
						: classes.item
				}
				style={{ color: '#56b280' }}>
				<svg
					className='inline w-7 h-7'
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
			</li>
			<li
				className={
					activeItem === 'ship'
						? `${classes.item} ${classes.active}`
						: classes.item
				}>
				Shipping
			</li>
			<li
				className={
					activeItem === 'payment'
						? `${classes.item} ${classes.active}`
						: classes.item
				}>
				Payment
			</li>
			<li
				className={
					activeItem === 'order'
						? `${classes.item} ${classes.activeLast}`
						: classes.item
				}>
				Order
			</li>
		</ul>
	);
};

export default Breadcrumb;
