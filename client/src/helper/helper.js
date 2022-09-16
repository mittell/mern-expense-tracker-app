import _ from 'lodash';

export const getSum = (transactions, type) => {
	let sum = _(transactions)
		.groupBy('type')
		.map((objs, key) => {
			if (!type) return _.sumBy(objs, 'amount');
			return {
				type: key,
				color: objs[0].color,
				total: _.sumBy(objs, 'amount'),
			};
		})
		.value();

	return sum;
};

export const getLabels = (transactions) => {
	let amountSum = getSum(transactions, 'type');

	let total = _.sum(getSum(transactions));

	let percent = _(amountSum)
		.map((objs) => {
			return _.assign(objs, { percent: (100 * objs.total) / total });
		})
		.value();

	return percent;
};

export const chartData = (transactions, custom) => {
	let dataValue = getSum(transactions);

	let bg = _.map(transactions, (a) => a.color);
	bg = _.uniq(bg);

	const config = {
		data: {
			datasets: [
				{
					data: dataValue,
					backgroundColor: bg,
					hoverOffset: 4,
					borderRadius: 30,
					spacing: 10,
				},
			],
		},
		options: {
			cutout: 115,
		},
	};

	return custom ?? config;
};

export const getTotal = (transactions) => {
	return _.sum(getSum(transactions));
};
