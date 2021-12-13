import classes from './AdTable.module.css';

const Button = ({ toggle, stateChange }) => {
	return (
		<div className={classes.button} onClick={stateChange}>
			<div
				className={`${classes.innerButton} ${
					toggle ? classes.warnButton : classes.successButton
				}`}></div>
		</div>
	);
};

export default Button;
