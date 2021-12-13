import AdTable from '../AdTable/AdTable';
import classes from './Dashboard.module.css';

const Orders = () => {
	return (
		<div className={classes.orders}>
			<h1 className={classes.head}>Manage orders</h1>
			<div className={classes.table}>
				<div className='overflow-x-auto'>
					<div className='inline-block min-w-full rounded-lg overflow-hidden'>
						<AdTable />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
