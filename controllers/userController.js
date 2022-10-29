const User = require("../models/userModel");
var bcrypt = require('bcryptjs');

module.exports.register = async (req, res, next) =>
{
	try
	{
		const { username, email, password } = req.body;

		const usernameCheck = await User.findOne({ username });

		const emailCheck = await User.findOne({ email });
		if (usernameCheck)
		{
			return res.status(401).json({
				code: -1,
				msg: " Tên người dùng đã được sử dụng ",
			})
		} else if (emailCheck)
		{
			return res.status(401).json({
				code: -1,
				msg: " Email đã được sử dụng",
			})
		} else
		{
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);
			const user = await User.create({
				email, username, password: hashedPassword
			})
			delete user.password;
			const userData = {
				id: user._id,
				username: user.username,
				email: user.email
			}
			return res.status(201).json({
				code: 1,
				msg: " tao moi nguoi dung thanh cong ",
				userData
			})
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
module.exports.login = async (req, res, next) =>
{
	try
	{
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		if (!user)
		{
			return res.status(401).json({
				code: -1,
				msg: " Tên người dùng và Mật khẩu không tồn tại ",
			})
		} else
		{
			const isPasswordValid = bcrypt.compareSync(password, user.password);
			if (!isPasswordValid)
			{
				return res.status(401).json({
					code: -1,
					msg: " Tên người dùng và Mật khẩu không tồn tại ",
				})
			} else
			{
				const userData = {
					id: user._id,
					username: user.username,
					email: user.email,
					isAvatarImageSet: user.isAvatarImageSet,
					image: user.avatarImage,
				}
				delete user.password;
				return res.status(201).json({
					code: 1,
					msg: " dang nhap thanh cong ",
					userData
				})
			}
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
module.exports.setAvatarUser = async (req, res, next) =>
{
	try
	{
		const userId = req.params.id;
		const avatarImage = req.body.image;

		const userData = await User.findByIdAndUpdate(userId, {
			isAvatarImageSet: true,
			avatarImage
		}, {
			new: true,
			runValidators: true,
			useFindAndModify: false
		})
		if (userData)
		{
			return res.status(201).json({
				code: 1,
				isSet: userData.isAvatarImageSet,
				image: userData.avatarImage,
				msg: " thanh cong ",
			})
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
module.exports.getAllUser = async (req, res) =>
{
	try
	{
		const user = await User.find({ _id: { $ne: req.params.id } }).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);
		if (user)
		{
			return res.status(201).json({
				code: 1,
				user,
				msg: " thanh cong ",
			})
		}

	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}
module.exports.logout = (req, res, next) =>
{
	try
	{

		if (!req.params.id)
		{
			return res.status(401).json({
				code: -1,
				msg: " khong ton tai nguoi dung ",
			})
		} else
		{
			onlineUsers.delete(req.params.id);

			return res.status(201).json({
				code: 1,
				msg: " thanh cong ",
			})
		}

	} catch (error)
	{

		console.log(error);
		return res.status(500).json({
			code: 0,
			msg: " loi server ",
		})
	}
}