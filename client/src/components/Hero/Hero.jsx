import classes from './hero.module.css';

const Hero = () => {
	return (
		<div className={classes.hero}>
			<div className={classes.box}>
				<h1 className={classes.heading}>
					<span className={classes.emo}>🌱 </span>
					Buy pure oxygen
				</h1>
				<p className={classes.text}>
					Shop is a carefully edited collection of coveted handbags
					and accessories designed in New Zealand by artist,
				</p>
				<a href='#products' className={classes.button}>
					Discover our collection
				</a>
			</div>
		</div>
	);
};

export default Hero;
