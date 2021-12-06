import Card from '../Card/Card';
import Paginate from '../Paginate/Paginate';
import classes from './products.module.css';

const Products = ({ products, title }) => {
	return (
		<>
			<h1 className={classes.lead} id='products'>
				{title}
			</h1>
			<p className={classes.text}>
				Order it for you or for your beloved ones
			</p>
			{products?.loading && (
				<div className={classes.loading}>
					<div className='loader'></div>
				</div>
			)}
			<div className={classes.products}>
				{products?.products?.map((product) => (
					<Card key={product._id} popular product={product} />
				))}
			</div>
			{products && products.pages > 1 && (
				<Paginate
					totalPage={products.pages}
					currentPage={products.page}
				/>
			)}
			{products && products.error && (
				<div className={classes.error}> ⭕ {products.error}</div>
			)}
		</>
	);
};

export default Products;
