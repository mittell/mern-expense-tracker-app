import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Label from './Label';
import { default as api } from '../store/apiSlice';
import { chartData, getTotal } from '../helper/helper';

Chart.register(ArcElement);

const Graph = () => {
	const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

	let GraphData;

	if (isFetching) {
		GraphData = <div>Fetching...</div>;
	} else if (isSuccess) {
		GraphData = <Doughnut {...chartData(data)} />;
	} else if (isError) {
		GraphData = <div>Error</div>;
	}

	return (
		<div className='flex justify-center max-w-xs mx-auto'>
			<div className='item'>
				<div className='chart relative'>
					{GraphData}
					<h3 className='mb-4 font-bold title'>
						Total{' '}
						<span className='block text-3xl text-emerald-400'>
							￥{getTotal(data) ?? 0}
						</span>
					</h3>
				</div>
				<div className='flex flex-col py-10 gap-4'>
					<Label />
				</div>
			</div>
		</div>
	);
};

export default Graph;
