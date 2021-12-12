import { useState } from 'react';
import classes from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Modal from 'react-modal';
import actions from '../../store/admin/actions';
import { useDispatch } from 'react-redux';
Modal.setAppElement('#root');

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(204 244 229,1)',
	},
};

const Item = ({ product }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const dispatch = useDispatch();

	const deleteHandler = (id) => {
		dispatch(actions.deleteProduct(id));
		setIsOpen(false);
	};
	return (
		<div className={classes.list}>
			<Link to={`/products/${product._id}`} className={classes.imageDiv}>
				<img
					className={classes.image}
					src={product.image}
					alt='product.description'
				/>
			</Link>
			<Link to={`/products/${product._id}`} className={classes.title}>
				{product.name}
			</Link>
			<div className={classes.bottom}>
				<div className={classes.review}>
					{product.rating.toFixed(1)}({product.numReviews})
				</div>

				<div className={classes.right}>
					<div className={classes.price}>${product.price}</div>
				</div>
				<Link to='/admin/add-product' state={product}>
					<AiOutlineEdit size='24px' />
				</Link>
				<button onClick={openModal}>
					<AiOutlineDelete size='24px' color='red' />
				</button>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'>
					<h2 className='text-2xl text-center my-6'>
						Are you sure to delete this?
					</h2>
					<div className='flex justify-center items-center'>
						<button
							className='text-white px-6 py-1 m-3 bg-gray-800 rounded'
							onClick={closeModal}>
							Cancel
						</button>
						<button
							onClick={() => deleteHandler(product._id)}
							className='text-white px-6 py-1 m-3 bg-red-500 rounded'>
							Confirm
						</button>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default Item;
