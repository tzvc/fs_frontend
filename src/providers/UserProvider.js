import React, { createContext } from "react";
// services
import { register, login } from "../service/auth_service";

const UserContext = createContext({
	isLogged: false,
	username: "",
	token: "",
	register: () => {},
	login: () => {}
});

export class UserProvider extends React.Component {
	register = async (username, password) => {
		try {
			const user = await register(username, password);
			this.setState({
				username: user.username,
				token: user.token,
				isLogged: true
			});
		} catch (e) {
			return Promise.reject(e);
		}
	};

	login = async (username, password) => {
		try {
			const user = await login(username, password);
			this.setState({
				username: user.username,
				token: user.token,
				isLogged: true
			});
		} catch (e) {
			return Promise.reject(e);
		}
	};
	state = {
		isLogged: false,
		username: "",
		token: "",
		register: this.register,
		login: this.login
	};

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

// Render prop
export const UserConsumer = UserContext.Consumer;

// HOC
export function withUser(Component) {
	return function UserComponent(props) {
		return (
			<UserContext.Consumer>
				{contexts => <Component {...props} {...contexts} />}
			</UserContext.Consumer>
		);
	};
}
