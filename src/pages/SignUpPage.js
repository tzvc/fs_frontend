import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import StyledLink from "../components/Link";
import Spacer from "../components/Spacer";
import Form from "../components/Form";
import { SIGNIN_ROUTE } from "../constants/routes";
import { withRouter } from "react-router-dom";

import { toast } from "react-toastify";
import { withUser } from "../providers/UserProvider";

const Content = styled.div`
	width: 25em;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const Title = styled.h1`
	color: ${props => props.theme.primary};
	font-weight: normal;
	font-style: italic;
	letter-spacing: 0px;
	line-height: 1.2em;
	font-family: "Poppins", sans-serif;
	font-size: 4em;
	font-weight: 600;
	font-style: normal;
	letter-spacing: -0.01em;
	line-height: 1.3em;
	text-transform: none;
	text-decoration: none;
	margin: 0;
	@media (max-width: ${({ theme }) => theme.tablet}) {
		font-size: 3em;
	}
`;

class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", password_conf: "" };
	}

	_handleFormChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	_handleFormSubmit = async event => {
		event.preventDefault();
		console.log(this.props);
		if (this.state.password !== this.state.password_conf)
			return toast("Password doesn't match confirmation", {
				position: toast.POSITION.TOP_CENTER
			});
		try {
			await this.props.register(this.state.username, this.state.password);
			this.props.history.push("/");
		} catch (e) {
			toast.error(e, {
				position: toast.POSITION.TOP_CENTER
			});
		}
	};

	render() {
		return (
			<Content>
				<Title>Sign Up</Title>
				<Spacer />
				<Form onSubmit={this._handleFormSubmit}>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						type="text"
						placeholder="Enter a username"
						value={this.state.username}
						onChange={this._handleFormChange}
					/>
					<label>Password</label>
					<input
						name="password"
						type="password"
						placeholder="Enter your password"
						value={this.state.password}
						onChange={this._handleFormChange}
					/>
					<label>Confirmation</label>
					<input
						name="password_conf"
						type="password"
						placeholder="Password confirmation"
						value={this.state.password_conf}
						onChange={this._handleFormChange}
					/>
					<Spacer />
					<Button>Sign up</Button>
				</Form>
				<Spacer />

				<Spacer>
					Already have an account?&nbsp;
					<StyledLink to={SIGNIN_ROUTE}>Sign in</StyledLink>
				</Spacer>
			</Content>
		);
	}
}

export default withRouter(withUser(SignUpPage));
