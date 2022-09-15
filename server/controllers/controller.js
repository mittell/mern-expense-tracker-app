const model = require('../models/model');

const createCategory = async (req, res) => {
	const Create = new model.Categories({
		type: 'Savings',
		color: '#1f3b5c',
	});

	await Create.save((err) => {
		if (!err) {
			return res.json(Create);
		}

		return res
			.status(400)
			.json({ message: `Error while creating categories: ${err}` });
	});
};

const getCategories = async (req, res) => {
	let data = await model.Categories.find({});

	let filter = await data.map((v) =>
		Object.assign({}, { type: v.type, color: v.color })
	);

	return res.json(filter);
};

const createTransaction = async (req, res) => {
	if (!req.body) {
		return res.status(400).json('Post HTTP Data not provided');
	}

	let { name, type, amount } = req.body;

	const create = await new model.Transactions({
		name,
		type,
		amount,
		date: new Date(),
	});

	create.save((err) => {
		if (!err) {
			return res.json(create);
		}

		return res
			.status(400)
			.json({ message: `Error while creating Transaction: ${err}` });
	});
};

const getTransactions = async (req, res) => {
	let data = await model.Transactions.find({});

	return res.json(data);
};

const deleteTransaction = async (req, res) => {
	if (!req.body) {
		res.status(400).json({ message: 'Request body not found.' });
	}

	await model.Transactions.deleteOne(req.body, (err) => {
		if (!err) {
			return res.json('Record deleted!');
		}
	}).catch((err) => {
		res.json('Error while deleting Transaction!');
	});
};

const getLabels = async (req, res) => {
	model.Transactions.aggregate([
		{
			$lookup: {
				from: 'categories',
				localField: 'type',
				foreignField: 'type',
				as: 'categories_info',
			},
		},
		{
			$unwind: '$categories_info',
		},
	])
		.then((result) => {
			let data = result.map((v) =>
				Object.assign(
					{},
					{
						_id: v._id,
						name: v.name,
						type: v.type,
						amount: v.amount,
						color: v.categories_info['color'],
					}
				)
			);
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json('Lookup Collection Error');
		});
};

module.exports = {
	createCategory,
	getCategories,
	createTransaction,
	getTransactions,
	deleteTransaction,
	getLabels,
};
