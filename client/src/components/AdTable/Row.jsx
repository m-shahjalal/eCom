import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import actions from '../../store/admin/actions';
import classes from './AdTable.module.css';
import Button from './Button';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(0, 0, 0,,.5)',
	},
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
	},
};

const Row = ({ item }) => {
	const { _id, user, createdAt, amount, items, isDelivered } = item;
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [toggle, setToggle] = useState(isDelivered);
	const [modalDeclare, setModalDeclare] = useState('');

	const closeModal = () => setIsOpen(false);
	const openModal = (action) => {
		setIsOpen(true);
		setModalDeclare(action);
	};
	const changeDeliveryState = () => {
		dispatch(actions.updateOrder(_id, { isDelivered: !toggle }));
		setToggle(!toggle);
		closeModal();
	};
	const deleteOrderHandler = () => {
		dispatch(actions.deleteOrder(_id));
		closeModal();
	};

	return (
		<>
			<tr>
				<td className={classes.tableCell}>
					<div className='ml-3'>
						<p className={classes.tableText}>{_id}</p>
					</div>
				</td>
				<td className={classes.tableCell}>
					<p className={classes.tableText}>{user}</p>
				</td>
				<td className={classes.tableCell}>
					<p className={classes.tableText}>
						{createdAt.slice(0, 10)}
					</p>
				</td>
				<td className={classes.tableCell}>
					<p className={classes.tableText}>
						{(parseInt(amount) / 100).toFixed(2)}
					</p>
				</td>
				<td className={classes.tableCell}>
					<p className={classes.tableText}>
						<b>{items.length}</b>{' '}
						{items.length > 1 ? 'items' : 'item'}
					</p>
				</td>
				<td className={classes.tableCell}>
					<Button
						toggle={!toggle}
						stateChange={() => openModal('update')}
					/>
				</td>
				<td className={classes.tableCell}>
					<RiDeleteBinLine
						color='red'
						size='24px'
						className='cursor-pointer'
						onClick={() => openModal('delete')}
					/>
				</td>
			</tr>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Order Modal'>
				<h2 className='text-2xl text-center my-6'>
					Are you sure to{' '}
					{modalDeclare === 'delete' ? 'Delete' : 'change the State'}?
				</h2>
				<div className='flex justify-center items-center'>
					<button
						className='text-white px-6 py-1 m-3 bg-gray-800 rounded'
						onClick={closeModal}>
						Cancel
					</button>
					<button
						onClick={
							modalDeclare === 'update'
								? changeDeliveryState
								: modalDeclare === 'delete'
								? deleteOrderHandler
								: null
						}
						className='text-white px-6 py-1 m-3 bg-red-500 rounded'>
						Confirm
					</button>
				</div>
			</Modal>
		</>
	);
};

export default Row;
