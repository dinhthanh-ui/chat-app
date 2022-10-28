import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { toast } from 'react-toastify';
import axios from "axios"
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
const SetAvatar = () =>
{
	const api = "https://api.multiavatar.com/45678945"
	const navigate = useNavigate();
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	const setProfilePicture = async () =>
	{
		if (selectedAvatar === undefined)
		{
			toast.error("Vui long chon mot hình đại diện")
		} else
		{
			const user = await JSON.parse(
				localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
			)
			const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, {
				image: avatars[selectedAvatar]
			})
			if (data.isSet && data.code === 1)
			{
				user.isAvatarImageSet = true;
				user.avatarImage = data.image;
				localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
				navigate("/")
			} else
			{
				toast.error("Lỗi khi đặt hình đại diện. Vui lòng thử lại")
			}
		}
	}

	useEffect(() =>
	{
		bufferImage();
		if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
		{
			navigate("/login")
		}
	}, [navigate])
	const bufferImage = async () =>
	{
		try
		{
			const data = [];
			for (let i = 0; i < 4; i++)
			{
				const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
				const buffer = new Buffer.from(image.data);
				data.push(buffer.toString("base64"));
			}
			setAvatars(data);
			setIsLoading(false)
		} catch (error)
		{
			toast.error(error.response.data)
		}
	}

	return (
		<>
			{isLoading ? (
				<Container>
					<img src={Loader} alt="Loading" className="loader" />
				</Container>

			) : (
				<Container>
					<div className="title-container">
						<h1>Pick an avatar as your profile picture</h1>
					</div>
					<div className="avatars">{

						avatars.map((avatar, index) =>
						{
							return (
								<div key={index} className={`avatar ${selectedAvatar === index ? "selected " : ""}`} >
									<img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
										onClick={() => setSelectedAvatar(index)}
									/>
								</div>)
						})
					}</div>
					<button onClick={() => setProfilePicture()}
						className="submit-btn">
						Set as Profile picture
					</button>
				</Container>
			)}
		</>

	)

}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader{
	max-inline-size: 100%
}
.title-container{
	h1{
		color:white;
	}
}
.avatars{
	display: flex;
	gap: 2rem;

	.avatar{
		border: 0.4rem solid transparent;
		padding: 0.4rem;
		border-radius: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.5s ease-in-out;
		img{
			height: 6rem;
			transition: 0.5s ease-in-out;
		}
	}
	.selected{
		border:0.4rem solid #4e0eff;
	}
}
.submit-btn{
	background-color: #764cea;
	color: white;
	padding: 1rem 2rem;
	border: none;
	font-weight: bold;
	cursor: pointer;
	border-radius: 0.4rem;
	font-size: 1rem;
	text-transform: uppercase;
	&:hover{
	background-color: #4e0eff;
	}
}

`

export default SetAvatar


