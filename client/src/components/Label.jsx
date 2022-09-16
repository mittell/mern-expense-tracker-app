import React from 'react';
import { default as api } from '../store/apiSlice';
import { getLabels } from '../helper/helper';

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
			<h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
		</div>
	);
};

const Label = () => {
	const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

	let Labels;

	if (isFetching) {
		Labels = <div>Fetching...</div>;
	} else if (isSuccess) {
		Labels = getLabels(data, 'type').map((value, index) => (
			<LabelComponent key={index} data={value} />
		));
	} else if (isError) {
		Labels = <div>Error</div>;
	}

	return <>{Labels}</>;
};

export default Label;
