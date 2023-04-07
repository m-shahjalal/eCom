import classes from './hero.module.css';
import img from '../../images/bg.svg'

const Hero = () => {
	const handleClick = () => {
		window.scrollTo({ behavior: 'smooth', top: 730 });
	}
	return (
		<div className={classes.container}>
			<div className={classes.hero}>
			<div className={classes.content}>
				<h1 className={classes.heading}>Let's <span className='text-green-500'>Do A Better Thing</span> Today</h1>
				<p className={classes.leadText}>
				Homy is a collection of nursery tree and accessories designed in to decorate home and office. We are committed to creating products that are made with love and care.
				</p>
				<button onClick={handleClick} className={classes.shopButton}>Shop Now</button>
			</div>
			<img src={img} alt="bg" className={classes.image} />
		</div>
		</div>
	);
};

export default Hero;
