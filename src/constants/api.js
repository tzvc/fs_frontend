export const API_ROOT =
	process.env.NODE_ENV === "production"
		? "http://localhost:3000/api"
		: "https://upbeat-yonath-d53669.netlify.com:3000/api";
