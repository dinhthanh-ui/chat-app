import React, { useState } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from 'emoji-picker-react';



const ChatInput = ({ handleSendMessage }) =>
{
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [message, setMessage] = useState("")

	const handleEmojiPickerHideShow = () =>
	{
		setShowEmojiPicker(!showEmojiPicker);
	}
	const onClickPicker = (emojiObject) =>
	{
		let msg = message;
		msg = msg + emojiObject.emoji
		setMessage(msg);
	}

	const handleSendChat = (event) =>
	{
		event.preventDefault();
		if (message.length > 0)
		{
			handleSendMessage(message);
			setMessage('')
		}
	}
	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<BsEmojiSmileFill onClick={() => handleEmojiPickerHideShow()} />
					{showEmojiPicker && <Picker onEmojiClick={onClickPicker} disableAutoFocus={true} native />
					}
				</div>
				<div>
					<form className="input-container" onSubmit={(event) => handleSendChat(event)}>
						<input type="text" placeholder="type your message here" onChange={(e) => setMessage(e.target.value)} value={message} />
						<button type="submit"> <IoMdSend /></button>
					</form>
				</div>
			</div>
		</Container>
	)
}
const Container = styled.div`
display: grid;
align-items: center;
grid-template-rows: 5% 95%;
background-color: #0808420;
padding: 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
	padding: 0 1rem;
	gap: 1rem
}
.button-container {
	display: flex;
	align-items: center;
	color: white;
	gap: 1rem;
	.emoji{
		position: relative;
		svg{
			font-size: 1.5rem;
			color: #ffff00c8;
			cursor: pointer;
		}
		.EmojiPickerReact{
		position: absolute !important;
        top: -29rem !important;
        background-color: #080420 !important;
        box-shadow: 0 5px 10px #9a86f3 !important;
        border-color: #9a86f3 !important;
			.epr-emoji-category-label{
				background-color: #080420 !important;
			}
		}
	}
}
.input-container{
	width: 22rem;
	border-radius: 2rem;
	display: flex;
	align-items: center;;
	gap: 2rem;
	background-color: #ffffff34;
	input{
		width: 90%;
		height: 60%;
		background-color: transparent;
		color: white;
		border: none !important;
		padding-left: 1rem;
		font-size: 1.2rem;
		&::selection {
        background-color: #9a86f3;
    };
		&:focus {
			outline: none;
		}
	}
	button{
		padding: 0.3rem 2rem;
		border-radius: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #9a86f3;
		border: none;
		@media screen and (min-width: 720px) and (max-width: 1080px){
			padding: 0.3rem 1rem;
			svg{
				font-size: 1rem;
			}
		}
		svg{
			font-size: 2rem;
			color: white
		}
	}
}
`

export default ChatInput