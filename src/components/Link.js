import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
	color: ${props => props.theme.primary};
	text-decoration: none;
	&:hover {
		opacity: 0.8;
	}
`;

export default StyledLink;
