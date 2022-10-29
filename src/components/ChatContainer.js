import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { receiveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';

const ChatContainer = ({ currentChat, socket }) =>
{
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();

	const handleSendMessage = async (message) =>
	{
		try
		{
			let data = await JSON.parse(
				localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
			);
			socket.current.emit('send-msg', {
				to: currentChat._id,
				from: data.id,
				message: message
			})

			await axios.post(sendMessageRoute, {
				from: data.id,
				to: currentChat._id,
				message: message
			})
			const msgs = [...messages];
			msgs.push({ fromSelf: true, message: message });
			setMessages(msgs)
		} catch (error) { }
	}
	useEffect(() =>
	{
		if (socket.current)
		{
			socket.current.on('msg-receive', (message) =>
			{
				setArrivalMessage({ fromSelf: false, message: message });
			})
		}
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, socket])
	useEffect(() =>
	{
		async function receiveMessage ()
		{
			const data = JSON.parse(
				localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
			)
			if (currentChat)
			{
				const response = await axios.post(receiveMessageRoute, {
					from: data.id,
					to: currentChat._id,
				})
				setMessages(response.data.errData)
			}
		}
		receiveMessage();
	}, [currentChat])

	useEffect(() =>
	{
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Container>
			<div className="chat-header">
				<div className="user-details">
					<div className="avatar">
						<img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
					</div>
					<div className="username">
						<h3>{currentChat.username}</h3>
					</div>
				</div>
				<Logout />
			</div>
			<div className="chat-messages">
				<div>
					<div className="message">
						{messages.map((message) =>
						{
							return (
								<div ref={scrollRef} key={uuidv4()}>
									<div
										className={`message ${message.fromSelf ? "sended" : "received"}`}
									>
										<div className="content">
											<p>{message.message}</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<ChatInput handleSendMessage={handleSendMessage} />
		</Container>
	)
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;
@media screen and(min-width: 720px) and (max-width: 1080px){
	grid-template-rows:15% 70% 15%
}
.chat-header{
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	.user-details {
		display:flex;
		align-items: center;
		gap: 1rem;
		.avatar{
			img{
				height: 3rem;
			}
		}
		.username {
			h3{
				color: white;
			}
		}
	}
	
}
.chat-messages {
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.message {
			.content {
				display: flex;
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;
				color: #d1d1d1;
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					max-width: 70%;
				}
			}
		}
		.sended {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.content {
				background-color: #4f04ff21;
			}
		}
		.received {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.content {
				background-color: #9900ff20;
			}
		}
	}

`
export default ChatContainer