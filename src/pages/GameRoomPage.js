import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
// components
import Spacer from "../components/Spacer";
import GameRenderer from "../components/GameRenderer";
import Button from "../components/Button";
import { WS_ROOT } from "../constants/api";
import { withUser } from "../providers/UserProvider";

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-around;
`;

const SidePanel = styled.div`
	width: 30em;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const GameFrame = styled.div`
	border: 2px solid ${props => props.theme.text};

	width: 500px;
	height: 500px;
`;
const Title = styled.h1`
	color: ${props => (props.isError ? "red" : props.theme.primary)};
	font-size: 36px;
	font-style: italic;
	letter-spacing: 0px;
	line-height: 1.2em;
	font-family: "Poppins", sans-serif;
	font-size: 5em;
	font-weight: 600;
	font-style: normal;
	letter-spacing: -0.01em;
	line-height: 1.3em;
	text-transform: none;
	text-decoration: none;
	margin: 0;
	@media (max-width: ${({ theme }) => theme.tablet}) {
		font-size: 3em;
	}
`;

const Lobby = styled.div`
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	font-size: 1.5em;
	width: 100%;
	color: ${props => props.theme.text};
`;

const PlayerList = styled.ul`
	padding-top: 1em;
	font-weight: normal;
	font-size: 1rem;
	width: 100%;
`;

const PlayerListRow = styled.li`
	display: flex;
	width: 100%;
	height: 3em;
	align-items: center;
	justify-content: space-between;
`;

const STATE_CONNECTING = 0;
const STATE_CONNECTED = 1;
const STATE_ERROR = 2;

class GameRoomPage extends React.Component {
	constructor(props) {
		super(props);
		this.room = this.props.match.params["roomId"];
		this.state = {
			users: [],
			isGameRunning: false,
			isReady: false,
			room_state: STATE_CONNECTING
		};
		this.socket = null;
	}

	componentDidMount() {
		this.socket = io(WS_ROOT);
		this.socket.emit("LOGIN_REQUEST", {
			username: this.props.username,
			password: this.props.password,
			token: this.props.token
		})

		this.socket.emit("JOIN_ROOM_REQUEST", this.room)

		this.socket.on("UPDATE_ROOM_STATE", data => {
			var isReady = this.state.isReady

			data.users.forEach(user => {
				if (user.username === this.props.username) isReady = user.isReady
			});
			this.setState({
				users: data.users,
				isGameRunning: data.isGameRunning,
				room_state: STATE_CONNECTED,
				isReady: isReady
			})
		});

		// this.socket.on("connect_error", () =>
		// 	this.setState({
		// 		room_state: STATE_ERROR
		// 	})
		// );
	}

	componentWillUnmount() {
		this.socket.emit("LEAVE_ROOM_REQUEST", this.room)
	}

	_addToLimitedQueue = str => {
		this.setState(pv => ({ messages: pv.slice(0, 10) }));
	};

	_setReady = () => {
		try {
			this.socket.emit("GAME__TOGGLE_READY", {
				token: this.props.token,
				isReady: !this.state.isReady
			});
		} catch (e) {
			console.error("Error connecting to room");
		}
	};

	render() {
		return (
			<Content>
				<SidePanel>
					<Title isError={this.state.room_state === STATE_ERROR}>{`Room #${
						this.room
					} ${
						this.state.room_state === STATE_ERROR ? "not found" : ""
					}`}</Title>
					{this.state.room_state === STATE_CONNECTED && (
						<Lobby>
							Players {this.state.users.length} / 10
							<PlayerList>
								{this.state.users.map(player => (
									<PlayerListRow key={player.gameId}>
										<span>{player.username}</span>
										<span>{player.isReady === true ? "Ready" : ""}</span>
									</PlayerListRow>
								))}
							</PlayerList>
						</Lobby>
					)}

					<Spacer />
						<Button onClick={this._setReady}>
							{this.state.isReady ? ("Waiting ...") : ("I'm ready !")}
						</Button>

				</SidePanel>

				<GameFrame>
					{this.state.isGameRunning && <GameRenderer token={this.props.token} socket={this.socket} />}
				</GameFrame>
			</Content>
		);
	}
}

export default GameRoomPage = withRouter(withUser(GameRoomPage));
