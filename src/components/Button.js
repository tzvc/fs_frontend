import styled, { keyframes } from "styled-components";
const gradient = keyframes`
  0% {
    background-position:0 0
  }

  100% {
    background-position:100% 0
  }
`;

const Button = styled.button`
	font-size: 1.4rem;
	line-height: 2rem;
	color: ${props => props.theme.primaryBackground};
	font-weight: bold;
	position: relative;
	box-sizing: border-box;
	width: 100%;
	border-radius: 2px;
	padding: 1rem 1rem 1rem 1.5rem;
	animation: ${gradient} 3s linear infinite;
	background-position: 0% 0%;
	background: linear-gradient(
		to right,
		${props => props.theme.secondary},
		${props => props.theme.primary}
	);
	&:hover {
		cursor: pointer;
		opacity: 0.7;
	}
`;

export default Button;
