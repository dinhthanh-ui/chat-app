const Message = require('../models/messageModels');

module.exports.addMessage = async (req, res, next) =>
{
	try
	{
		const { from, to, message } = req.body;
		const data = await Message.create({
			message: { text: message },
			users: [from, to],
			sender: from
		})
		if (data)
		{
			return res.status(201).json({
				code: 1,
				msg: "Đã thêm tin nhắn thành công"
			})
		} else
		{
			return res.status(401).json({
				code: -1,
				msg: " Không thêm được tin nhắn vào cơ sở dữ liệu, vui long kiem tra lai ",
			})
		}
	} catch (error)
	{
		console.error(error)
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
module.exports.getMessage = async (req, res, next) =>
{
	try
	{

		const { from, to } = req.body;

		const messages = await Message.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updateAt: 1 })

		const projectedMessage = messages.map((msg) =>
		{
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text
			};
		});
		res.status(201).json({
			code: 1,
			errData: projectedMessage,
			msg: "thanh cong"
		})

	} catch (error)
	{
		console.error(error)
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
