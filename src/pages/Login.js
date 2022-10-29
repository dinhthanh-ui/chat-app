import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast } from 'react-toastify';
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';
const Login = () =>
{
	const navigate = useNavigate()

	const [values, setValues] = useState({
		username: "",
		password: ""
	})
	const handleSubmit = async (event) =>
	{
		event.preventDefault();
		if (handleValidation())
		{
			try
			{
				const { username, password } = values;
				const { data } = await axios.post(loginRoute, {
					username, password,
				})
				if (data.code === 1)
				{
					localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.userData))
				}
				navigate("/");
			} catch (error)
			{
				console.log(error)
				toast.error(error.response.data.msg)
			}
		}
	};

	const handleChange = (event) => 
	{
		setValues({ ...values, [event.target.name]: event.target.value });
	}

	const handleValidation = () =>
	{
		const { username, password } = values;
		if (username === "")
		{
			toast.error("username, password không được để trống va Mật khẩu phải bằng hoặc lớn hơn 8 ký tự ");
			return false;
		}
		else if (password === "")
		{
			toast.error("username, password không được để trống va Mật khẩu phải bằng hoặc lớn hơn 8 ký tự");
			return false;
		} else if (password.length < 8)
		{
			toast.error("username, password không được để trống va Mật khẩu phải bằng hoặc lớn hơn 8 ký tự");
			return false;
		} else
		{
			return true
		}
	}

	useEffect(() =>
	{
		if (localStorage.getItem("chat-app-user"))
		{
			navigate("/")
		}
	}, [navigate])

	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<img src={Logo} alt="Logo" />
						<h1>snappy</h1>
					</div>
					<input type="text" className="" placeholder="Username" name="username" min="3" onChange={(event) => handleChange(event)} />
					<input type="password" className="" placeholder="Password" name="password" onChange={(event) => handleChange(event)} />
					<button type="submit">Login</button>
					<span>Bạn chưa có tài khoản ? <Link to="/register">register</Link></span>
				</form>
			</FormContainer>
		</>
	)
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
background-color:#131324;
.brand{
	display: flex;
	align-items: center;
	gap: 1rem;
	justify-content: center;
	img{
		height: 5rem;
	}
	h1{
		color: white;
		text-transform: uppercase;
	}
}
form{
	display: flex;
	flex-direction: column;
	gap: 2rem;
	background-color: #00000076;
	border-radius: 2rem;
	padding: 3rem 5rem;
	input{
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0%.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus{
			border: 0.1rem solid #997af0;
			outline: none
		}
	}
	button{
		background-color: #997af0;
		color: white;
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 4rem.0%;
		font-size: 1rem;
		text-transform: uppercase;
		transition: 0.5s ease-in-out;
		&:hover{
			background-color: #4e0eff
		}
	}
	span{
		color: white;
		text-transform: uppercase;
		a{
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold
		}
	}
}
`;

export default Login