const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", userRoute)
// connect mongoose
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => { console.log('connect mongodb successfully') })
	.catch((err) => { console.log(err.message) })

const server = app.listen(process.env.PORT, () =>
{
	console.log('listening on port ' + process.env.PORT)
})



