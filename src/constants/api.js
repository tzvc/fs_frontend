export const API_ROOT =
	process.env.NODE_ENV === "development"
		? "http://localhost/api"
		: "https://upbeat-yonath-d53669.netlify.com/api";
