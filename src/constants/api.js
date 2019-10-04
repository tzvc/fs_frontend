export const API_ROOT =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080/api"
		: "https://skibble.herokuapp.com/api";

export const WS_ROOT =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080/lobby"
		: "https://skibble.herokuapp.com/lobby";
