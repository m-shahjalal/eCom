import classes from './hero.module.css';

const Hero = () => {
	return (
		<div className={classes.hero}>
			<div className={classes.box}>
				<h1 className={classes.heading}>
					<span className={classes.emo}>🌱 </span>
					Be refresh with nature
				</h1>
				<p className={classes.text}>
					Homy is a collection of nursery tree and accessories
					designed in to decorate home
				</p>
				<a href='#products' className={classes.button}>
					Discover our collection
				</a>
			</div>
		</div>
	);
};

export default Hero;
