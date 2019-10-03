export const API_ROOT =
	process.env.NODE_ENV === "development"
		? "http://localhost/api"
		: "https://skibble.herokuapp.com/api";
