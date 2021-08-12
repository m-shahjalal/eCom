import { Link } from 'react-router-dom';
import gift from '../../images/category/gift.jpeg';
import indoorOutdoor from '../../images/category/indoor-outdoor.jpg';
import indoor from '../../images/category/indoor.jpg';
import outdoor from '../../images/category/outdoor.png';
import classes from './category.module.css';

const category = [
	{
		name: 'Indoor',
		img: indoor,
	},
	{
		name: 'Outdoor',
		img: outdoor,
	},
	{
		name: 'indoor and outdoor',
		img: indoorOutdoor,
	},
	{
		name: 'Gift',
		img: gift,
	},
];

const Category = () => {
	return (
		<div className={classes.categoryContainer}>
			<div className={classes.category}>
				{category.map((item) => (
					<div className={classes.item} key={item.name}>
						<Link
							className={classes.link}
							to={`/category/${item.name
								.toLowerCase()
								.split(' ')
								.join('-')}`}>
							<div className={classes.card}>
								<img
									className={classes.image}
									src={item.img}
									alt={item.name}
								/>
								<div className={classes.name}>{item.name}</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Category;
