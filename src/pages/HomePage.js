import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// components
import SingleFieldForm from "../components/SingleFieldForm";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { SIGNIN_ROUTE } from "../constants/routes";
import { withUser, UserConsumer } from "../providers/UserProvider";

const Content = styled.div`
	width: 25em;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const Description = styled.p`
	font-family: "Poppins", sans-serif;
	font-size: 1em;
	color: ${props => props.theme.text};
`;

const Title = styled.h1`
	color: ${props => props.theme.primary};
	font-size: 36px;
	font-weight: normal;
	font-style: italic;
	letter-spacing: 0px;
	line-height: 1.2em;
	font-family: "Poppins", sans-serif;
	font-size: 5em;
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

const HomePage = withRouter(({ history }) => (
	<UserConsumer>
		{({ isLogged }) => (
			<Content>
				<Title>Skible</Title>
				<Description>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Description>
				<Spacer />

				{isLogged ? (
					<>
						<SingleFieldForm
							placeholder="Join or create a room"
							onSubmit={value => history.push(`/room/${value}`)}
						/>
					</>
				) : (
					<Button onClick={() => history.push(SIGNIN_ROUTE)}>Sign In</Button>
				)}
			</Content>
		)}
	</UserConsumer>
));

export default HomePage;
