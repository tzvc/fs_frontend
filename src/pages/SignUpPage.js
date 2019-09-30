import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import StyledLink from "../components/Link";
import Spacer from "../components/Spacer";
import Form from "../components/Form";
import { SIGNIN_ROUTE } from "../constants/routes";

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

const SignUpPage = () => (
	<Content>
		<Title>Sign Up</Title>
		<Spacer />
		<Form>
			<label for="male">Username</label>
			<input placeholder="Enter a username" />
			<label for="male">Password</label>
			<input placeholder="Enter your password" />
			<label for="male">Confirmation</label>
			<input placeholder="Password confirmation" />
		</Form>
		{/* <Spacer>OR</Spacer> */}
		<Spacer />

		<Button>Sign up</Button>
		<Spacer>
			Already have an account?&nbsp;
			<StyledLink to={SIGNIN_ROUTE}>Sign in</StyledLink>
		</Spacer>
	</Content>
);

export default SignUpPage;
