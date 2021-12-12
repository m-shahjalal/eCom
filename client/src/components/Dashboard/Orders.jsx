import classes from './Dashboard.module.css';
import { useState } from 'react';

const Orders = () => {
	const [options, setOptions] = useState();
	const updateStatus = (e) => {
		console.log(e.target.value);
	};

	return (
		<div className={classes.orders}>
			<h1 className={classes.head}>Your orders</h1>
			<div className={classes.table}>
				<div className='overflow-x-auto'>
					<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
						<table className='min-w-full leading-normal'>
							<thead>
								<tr>
									<th className={classes.tableData}>
										Order ID
									</th>
									<th className={classes.tableData}>Email</th>
									<th className={classes.tableData}>
										Created at
									</th>
									<th className={classes.tableData}>
										Status
									</th>
									<th className={classes.tableData}>
										Delete
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className={classes.tableCell}>
										<div className='ml-3'>
											<p className={classes.tableText}>
												12332124123425
											</p>
										</div>
									</td>
									<td className={classes.tableCell}>
										<p className={classes.tableText}>
											admin@admin.com
										</p>
									</td>
									<td className={classes.tableCell}>
										<p className={classes.tableText}>
											Jan 21, 2020
										</p>
									</td>
									<td className={classes.tableCell}>
										<p className={classes.tableText}>43</p>
									</td>
									<td className={classes.tableCell}>
										<span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
											<span
												aria-hidden
												className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
											<span className='relative'>
												<select
													defaultChecked='completed'
													onChange={updateStatus}
													className='bg-green-100'
													name='status'
													id='status'>
													<option
														className='outline-none'
														value='pending'>
														pending
													</option>
													<option
														className='outline-none'
														value='completed'>
														completed
													</option>
												</select>
											</span>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
