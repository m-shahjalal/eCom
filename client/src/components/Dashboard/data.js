import React from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { BiTimer } from 'react-icons/bi';
import { MdOutlineFiberNew } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';

export const links = [
	{
		id: 1,
		url: '',
		text: 'Dashboard',
		icon: <MdDashboardCustomize className='w-5 h-5' />,
	},
	{
		id: 2,
		url: 'orders',
		text: 'Manage Orders',
		icon: <BiTimer className='w-5 h-5' />,
	},
	{
		id: 3,
		url: 'products',
		text: 'Manage Product',
		icon: <FaProductHunt className='w-5 h-5' />,
	},
	{
		id: 4,
		url: 'add-product',
		text: 'Add New Product',
		icon: <MdOutlineFiberNew className='w-5 h-5' />,
	},
	{
		id: 5,
		url: 'make-admin',
		text: 'Make admin',
		icon: <GrUserAdmin className='w-5 h-5' />,
	},
];
