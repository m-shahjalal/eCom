import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/admin/actions';
import classes from './AdTable.module.css';
import Row from './Row';

const AdTable = () => {
	const { loading, data, error } = useSelector((state) => state.adOrders);
	const dispatch = useDispatch();

	useEffect(() => dispatch(actions.getOrders()), [dispatch]);
	if (loading) return <div className='loader'></div>;
	if (error) return <div className='text-red-600 py-10 px-4'>{error}</div>;
	return (
		<table className='min-w-full leading-normal shadow-md'>
			<thead>
				<tr>
					<th className={classes.tableData}>Order ID</th>
					<th className={classes.tableData}>User ID</th>
					<th className={classes.tableData}>Created at</th>
					<th className={classes.tableData}>price</th>
					<th className={classes.tableData}>Products</th>
					<th className={classes.tableData}>Status</th>
					<th className={classes.tableData}>Delete</th>
				</tr>
			</thead>
			<tbody>
				{data && data.map((item) => <Row item={item} key={item._id} />)}
			</tbody>
		</table>
	);
};

export default AdTable;
