const mongoose = require('mongoose');

const connection = mongoose
	.connect(process.env.MONGO)
	.then((db) => {
		console.log('Database Connected');
		return db;
	})
	.catch((err) => {
		console.log('Connection Error');
	});

module.exports = connection;
