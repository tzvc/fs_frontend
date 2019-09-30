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
	primaryBackground: "#1d1e26",
	tablet: "768px"
};

const GlobalStyle = createGlobalStyle`
  body {
		height: 100%;
		background-image: radial-gradient(circle at 0% 0%, #373b52, #252736 100%, #1d1e26);
		margin: 0;
		padding: 5vh 5vw;
		max-width: 1200px;
    background-repeat: no-repeat;
    background-attachment: fixed;
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
