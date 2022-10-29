const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const app = express();
const socket = require('socket.io');
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", userRoute)
app.use("/api/v1/messages", messageRoute)
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
const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true
	}
});
global.onlineUsers = new Map();
io.on('connection', (socket) =>
{
	global.chatSocket = socket;

	socket.on("add-user", (userId) =>
	{
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) =>
	{
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket)
		{
			socket.to(sendUserSocket).emit("msg-receive", data.message)
		}
	})
})




