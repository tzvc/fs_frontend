import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SIGNIN_ROUTE } from "../constants/routes";
import { UserConsumer } from "../providers/UserProvider";

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const NavElem = styled(Link)`
	font-family: "Poppins", sans-serif;
	font-size: 1em;
	text-decoration: none;
	color: ${props => props.theme.primary};
	&:hover {
		cursor: pointer;
		opacity: 0.7;
	}
	padding: 2rem 0;
`;

const NavBar = () => {
	return (
		<UserConsumer>
			{({ username, isLogged }) => (
				<Content>
					<NavElem to={SIGNIN_ROUTE}>{`${isLogged ? username : "Sign In"} ${
						process.env.NODE_ENV
					}`}</NavElem>
				</Content>
			)}
		</UserConsumer>
	);
};

export default NavBar;
