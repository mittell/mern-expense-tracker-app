import React from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';

// const obj = [
// 	{
// 		name: 'Savings',
// 		color: 'rgb(255,99,132)',
// 	},
// 	{
// 		name: 'Investment',
// 		color: 'rgb(54,162,235)',
// 	},
// 	{
// 		name: 'Expense',
// 		color: 'rgb(255,205,86)',
// 	},
// ];

const Transaction = ({ category }) => {
	if (!category) {
		return null;
	}
	return (
		<div
			className='item flex justify-center bg-gray-50 py-2 rounded-r'
			style={{ borderRight: `8px solid ${category.color ?? '#e5e5e5'}` }}
		>
			<button className='px-3'>
				<box-icon
					name='trash'
					size='25px'
					color={category.color ?? '#e5e5e5'}
				></box-icon>
			</button>
			<span className='block w-full m-1'>{category.name ?? ''}</span>
		</div>
	);
};

const History = () => {
	const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

	let Transactions;

	if (isFetching) {
		Transactions = <div>Fetching...</div>;
	} else if (isSuccess) {
		Transactions = data.map((value, index) => (
			<Transaction category={value} key={index} />
		));
	} else if (isError) {
		Transactions = <div>Error</div>;
	}

	return (
		<div className='flex flex-col py-6 gap-3'>
			<h1 className='py-4 font-bold text-xl'>History</h1>
			{Transactions}
		</div>
	);
};

export default History;
