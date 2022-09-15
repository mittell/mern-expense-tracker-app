const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoryModel = new Schema({
	type: {
		type: String,
		default: 'Investment',
	},
	color: {
		type: String,
		default: '#fcbe44',
	},
});

const transactionModel = new Schema({
	name: {
		type: String,
		default: 'Anonymous',
	},
	type: {
		type: String,
		default: 'Investment',
	},
	amount: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Categories = mongoose.model('categories', categoryModel);
const Transactions = mongoose.model('transactions', transactionModel);

exports.default = Transactions;
module.exports = {
	Categories,
	Transactions,
};
