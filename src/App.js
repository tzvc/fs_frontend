import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import GameRoomPage from "./pages/GameRoomPage";
// components
import NavBar from "./components/NavBar";
// constants
import { SIGNUP_ROUTE, SIGNIN_ROUTE } from "./constants/routes";
import { UserProvider } from "./providers/UserProvider";

const theme = {
	primary: "#03DAC5",
	secondary: "#b294ff",
	primaryBackground: "#1d1e26",
	text: "#bfd2ff",
	textAccent: "#7881a1",
	tablet: "768px"
};

const GlobalStyle = createGlobalStyle`
  body {
		height: 100%;
		background-image: radial-gradient(circle at 0% 0%, #373b52, #252736 100%, #1d1e26);
		margin: 0;
		padding: 5vh 5vw;
		// max-width: 1200px;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<ToastContainer />
				<Router>
					<GlobalStyle />
					<NavBar />
					<Route path="/" exact component={HomePage} />
					<Route path={SIGNUP_ROUTE} exact component={SignUpPage} />
					<Route path={SIGNIN_ROUTE} exact component={SignInPage} />
					<Route path="/room/:roomId" component={GameRoomPage} />
				</Router>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
