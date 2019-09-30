import styled from "styled-components";

const Form = styled.form`
	position: relative;
	width: 100%;
	box-sizing: border-box;
	label {
		font-family: "Poppins", sans-serif;
		font-size: 1em;
		color: ${props => props.theme.text};
	}
	input {
		border-radius: 2px;
		width: 100%
		background: rgba(57, 63, 84, 0.8);
		margin: 0.5rem 0 1rem 0;
		display: block;
		padding: 1rem;

		color: ${props => props.theme.text};
		font-size: 1.4rem;
		line-height: 2.4rem;
		vertical-align: middle;
		&::-webkit-input-placeholder {
			color: ${props => props.theme.textAccent};
		}
	}
`;

export default Form;
