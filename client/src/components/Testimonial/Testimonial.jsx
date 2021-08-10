import { useEffect, useState } from 'react';
import useWindow from '../../hooks/useWindow';
import img1 from '../../images/face/img-1.png';
import img2 from '../../images/face/img-2.png';
import img3 from '../../images/face/img-3.png';
import half from '../../images/icons/half_star.png';
import star from '../../images/icons/star.png';
import classes from './testimonial.module.css';

const data = [
	{
		id: 1,
		name: 'S Smith',
		photo: img1,
		text: '“I love it! I will buy again”',
		star: 4.5,
	},
	{
		id: 2,
		name: 'Luisa',
		photo: img2,
		text: '“Recommended for everyone”',
		star: 5,
	},
	{
		id: 3,
		name: 'Mart',
		photo: img3,
		text: '“A valuable project, This is really awesome”',
		star: 4.5,
	},
	{
		id: 4,
		name: 'S Smith',
		photo: img1,
		text: '“I love it! I will buy again”',
		star: 4.5,
	},
	{
		id: 5,
		name: 'Luisa',
		photo: img2,
		text: '“Recommended for everyone”',
		star: 5,
	},
	{
		id: 6,
		name: 'Mart',
		photo: img3,
		text: '“A valuable project, This is really awesome”',
		star: 4.5,
	},
];

const Testimonial = () => {
	const [view, setView] = useState([]);
	const [muteRight, setMuteRight] = useState(false);
	const [muteLeft, setMuteLeft] = useState(false);
	const { width } = useWindow();

	useEffect(() => {
		const widthHandler = () => {
			if (width > 768 && width < 1024) {
				return data.slice(0, 2);
			} else if (width > 1024) {
				return data.slice(0, 3);
			} else {
				return data.slice(0, 1);
			}
		};
		setView(widthHandler());
	}, [width]);

	const leftHandler = () => {
		const arr = [...view];
		const isFirstItem = arr[0].id === data[0].id;
		if (isFirstItem) {
			setMuteLeft(true);
		} else {
			const { id } = [...arr].shift(); // find the first item's id
			const item = data.find((itm) => itm.id === id); // find that item in main array
			const index = data.findIndex((itm) => itm.id === item.id); // find the index of that item
			arr.unshift(data[index - 1]);
			arr.pop(); // remove the last item
			setView(arr);
		}
		setMuteRight(false);
	};

	const rightHandler = () => {
		const arr = [...view];
		const item = [...arr].pop();
		const index = data.findIndex((itm) => itm.id === item.id);
		arr.shift();
		if (index === data.length - 1) {
			setMuteRight(true);
		} else {
			const next = data[index + 1];
			arr.push(next);
			setView(arr);
		}
		setMuteLeft(false);
	};
	return (
		<div className={classes.testimonial}>
			<h2 className={classes.head}>Testimonials</h2>
			<p className={classes.sub}>Some quotes from our happy customers</p>
			<div className={classes.slider}>
				<div
					className={classes.left}
					onClick={leftHandler}
					style={muteLeft ? { opacity: '.4' } : {}}>
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
							d='M15 19l-7-7 7-7'
						/>
					</svg>
				</div>
				<div className={classes.row}>
					{view.map((item) => (
						<div className={classes.card} key={item.id}>
							<img
								src={item.photo}
								alt='cover'
								className={classes.image}
							/>
							<div className={classes.star}>
								{[...Array(parseInt(item.star))].map((_, i) => (
									<img
										key={i}
										src={star}
										alt='star'
										className={classes.fullStar}
									/>
								))}
								{item.star % 1 !== 0 && (
									<img
										src={half}
										alt='half star'
										className={classes.halfStar}
									/>
								)}
							</div>
							<div className={classes.text}>{item.text}</div>
							<div className={classes.name}>{item.name}</div>
						</div>
					))}
				</div>
				<div
					className={classes.right}
					onClick={rightHandler}
					style={muteRight ? { opacity: '.4' } : {}}>
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
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
