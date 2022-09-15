require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require('./routes/route'));

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
