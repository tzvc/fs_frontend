import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import GameRoomPage from "./pages/GameRoomPage";
// components
import NavBar from "./components/NavBar";

const theme = {
	primary: "#03DAC5",
	primaryBackground: "#303030",
	tablet: "768px"
};

const GlobalStyle = createGlobalStyle`
  body {
		height: 100%;
		background-color: ${({ theme }) => theme.primaryBackground}
		margin: 0;
		padding: 5vh 5vw;
		max-width: 1200px;
		margin: auto;
  }
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<GlobalStyle />
				<NavBar />
				<Route path="/" exact component={HomePage} />
				<Route path="/:roomId" component={GameRoomPage} />
			</Router>
		</ThemeProvider>
	);
}

export default App;
