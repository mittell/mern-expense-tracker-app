import React from 'react';
import { default as api } from '../store/apiSlice';

// const obj = [
// 	{
// 		type: 'Savings',
// 		color: 'rgb(255,99,132)',
// 		percent: 45,
// 	},
// 	{
// 		type: 'Investment',
// 		color: 'rgb(54,162,235)',
// 		percent: 20,
// 	},
// 	{
// 		type: 'Expense',
// 		color: 'rgb(255,205,86)',
// 		percent: 10,
// 	},
// ];

const LabelComponent = ({ data }) => {
	if (!data) {
		return <></>;
	}

	return (
		<div className='label flex justify-between'>
			<div className='flex gap-2'>
				<div
					className='w-2 h-2 rounded py-3'
					style={{ background: data.color ?? '#f9c74f' }}
				></div>
				<h3 className='text-md'>{data.type ?? ''}</h3>
			</div>
			<h3 className='font-bold'>{data.percent ?? 0}%</h3>
		</div>
	);
};

const Label = () => {
	const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

	let Transactions;

	if (isFetching) {
		Transactions = <div>Fetching...</div>;
	} else if (isSuccess) {
		Transactions = data.map((value, index) => (
			<LabelComponent key={index} data={value} />
		));
	} else if (isError) {
		Transactions = <div>Error</div>;
	}

	return <>{Transactions}</>;
};

export default Label;
