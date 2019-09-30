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
	line-height: 2.4rem;
	color: ${props => props.theme.primaryBackground};
	font-weight: bold;
	position: relative;
	display: flex;
	flex-direction: row;
	width: 100%;
	border-radius: 2px;
	padding: 1rem 1rem 1rem 1.5rem;
	animation: ${gradient} 3s linear infinite;
	background-position: 0% 0%;
	background: linear-gradient(to right, #b294ff, #57e6e6);
	&:hover {
		cursor: pointer;
		opacity: 0.7;
	}
`;

export default Button;
