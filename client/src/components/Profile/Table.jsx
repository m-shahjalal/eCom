import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../store/order/action';
import classes from './profile.module.css';

const Table = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders);
	useEffect(() => {
		dispatch(actions.orders());
	}, [dispatch]);
	return (
		<div className={classes.tableRow}>
			<div className={classes.tableContainer}>
				<h3 className={classes.lead}>My orders</h3>
				{orders.loading && (
					<div
						className='loader'
						style={{
							borderRightColor: '#4d4d4d33',
							borderTopColor: '#4d4d4d33',
							borderBottomColor: '#4d4d4d33',
							borderLeftColor: 'white',
						}}></div>
				)}
				<table className={classes.table}>
					<thead>
						<tr className={classes.innerRow}>
							<th className={classes.tableHead}>ID</th>
							<th className={classes.tableHead}>DATE</th>
							<th className={classes.tableHead}>TOTAL</th>
							<th className={classes.tableHead}>DELIVERED</th>
							<th className={classes.tableHead}>DETAILS</th>
						</tr>
					</thead>
					<tbody>
						{orders.list?.map((elem) => (
							<Fragment key={elem._id}>
								<tr className={classes.innerRow}>
									<td className={classes.tableData}>
										{elem._id}
									</td>
									<td className={classes.tableData}>
										{elem.createdAt.slice(0, 10)}
									</td>
									<td className={classes.tableData}>
										${elem.amount / 100}
									</td>
									<td className={classes.tableData}>
										{elem.isDelivered ? (
											<svg
												className='w-8 h-8'
												fill='#56b280'
												stroke='#56b280'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													stroke='#ffffff'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
										) : (
											<svg
												className='w-8 h-8'
												fill='#ff0000'
												stroke='#ff0000'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													stroke='#ffffff'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
										)}
									</td>
									<td className={classes.tableData}>
										<Link
											to={{
												pathname: `/orders/${elem._id}`,
												state: elem,
											}}
											className={classes.detailButton}>
											details
										</Link>
									</td>
								</tr>
							</Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
