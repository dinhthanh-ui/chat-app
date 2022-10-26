import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
const Register = () =>
{

	const handleSubmit = (event) =>
	{
		event.preventDefault();
		alert("from")
	};

	const handleChange = (event) => 
	{

	}

	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<img src="" alt="" />
						<h1>snappy</h1>
					</div>
					<input type="text" className="" placeholder="Username" name="username" onchange={(event) => handleChange(event)} />
					<input type="email" className="" placeholder="Email" name="email" onchange={(event) => handleChange(event)} />
					<input type="password" className="" placeholder="Password" name="password" onchange={(event) => handleChange(event)} />
					<input type="password" className="" placeholder="Confirm Password" name="confirmPassword" onchange={(event) => handleChange(event)} />
					<button type="submit">Create User</button>
					<span>already have an account ? <Link to="/login">Login</Link></span>
				</form>
			</FormContainer>
		</>
	)
}
const FormContainer = styled.div``;

export default Register