import React from 'react';
import { BiTimer } from 'react-icons/bi';
import { FaProductHunt } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { MdDashboardCustomize, MdOutlineFiberNew } from 'react-icons/md';
import { RiFileUserLine } from 'react-icons/ri';

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
	{
		id: 6,
		url: 'users',
		text: 'Users List',
		icon: <RiFileUserLine className='w-5 h-5' />,
	},
];
