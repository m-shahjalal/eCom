import classes from './tick.module.css';
const Tick = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 130.2 130.2'
			className={classes.svg}>
			<circle
				className={`${classes.path} ${classes.circle}`}
				fill='#56b280'
				stroke='#ffffff3a'
				strokeWidth={6}
				strokeMiterlimit={10}
				cx={65.1}
				cy={65.1}
				r={62.1}
			/>
			<path
				className={`${classes.path} ${classes.check}`}
				fill='none'
				stroke='#fff'
				strokeWidth={15}
				strokeLinecap='round'
				strokeMiterlimit={10}
				d='M100.2 40.2L51.5 88.8 29.8 67.5'
			/>
		</svg>
	);
};

export default Tick;
