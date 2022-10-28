import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { toast } from 'react-toastify';
import axios from "axios"
import { allUserRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';

const Chat = () =>
{
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	console.log(currentChat)
	useEffect(() =>
	{
		async function getAllUser ()
		{
			try
			{
				if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
				{
					navigate("/login")
				} else if (currentUser && currentUser.isAvatarImageSet)
				{
					const results = await axios.get(`${allUserRoute}/${currentUser.id}`);
					setContacts(results.data.userData)
				} else if (currentUser && !currentUser.isAvatarImageSet)
				{
					navigate("/setAvatar")
				}
				else
				{
					setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
				}
			} catch (error)
			{
				toast.error(error)
			}
		}
		getAllUser()
	}, [currentUser, navigate])

	const handleChatChange = (chat) =>
	{
		setCurrentChat(chat);
	}
	return (
		<Container>
			<div className="container">
				<Contacts contacts={contacts} changeChat={handleChatChange} />
			</div>
		</Container>
	)
}
const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container{
	height: 85vh;
	width: 85vw;
	background-color: #00000076;
	display: grid;
	grid-template-columns:25% 75%;
	@media screen and(min-width: 720px) and (max-width: 1080px){
		grid-template-columns:35% 65%;
	}
}

`;


export default Chat