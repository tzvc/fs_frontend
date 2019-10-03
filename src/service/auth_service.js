// constants
import { API_ROOT } from "../constants/api";

const safeJson = response =>
	response.ok
		? response.json()
		: Promise.reject("Failed to load data from server");

export const register = async (username, password) => {
	const payload = { username: username, password: password };
	try {
		const res = await fetch(`${API_ROOT}/register`, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" }
		});
		return safeJson(res);
	} catch (e) {
		return Promise.reject(e.message);
	}
};

export const login = async (username, password) => {
	const payload = { username: username, password: password };
	try {
		const res = await fetch(`${API_ROOT}/login`, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" }
		});
		return safeJson(res);
	} catch (e) {
		return Promise.reject(e.message);
	}
};
