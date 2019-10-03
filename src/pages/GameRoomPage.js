import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
// components
import Spacer from "../components/Spacer";
import GameRenderer from "../components/GameRenderer";
import Button from "../components/Button";

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

const Description = styled.p`
	font-family: "Poppins", sans-serif;
	font-size: 1em;
	color: ${props => props.theme.text};
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
			room_state: STATE_CONNECTING
		};
		this.socket = null;
	}

	componentDidMount() {
		this.socket = io("http://localhost:1080");
		this.socket.on("lobby_update", data =>
			this.setState({
				users: data.users,
				isGameRunning: data.isGameRunning,
				room_state: STATE_CONNECTED
			})
		);
		this.socket.on("connect_error", () =>
			this.setState({
				room_state: STATE_ERROR
			})
		);
	}

	_addToLimitedQueue = str => {
		this.setState(pv => ({ messages: pv.slice(0, 10) }));
	};

	_startGame = () => {
		try {
			this.socket.emit("start_game");
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
									<PlayerListRow>
										<span>{player.id}</span>
										<span>{player.status == 1 ? "playing" : ""}</span>
									</PlayerListRow>
								))}
							</PlayerList>
						</Lobby>
					)}

					<Spacer />
					<Button onClick={this._startGame}>Start Game</Button>
				</SidePanel>

				<GameFrame>
					{this.state.isGameRunning && <GameRenderer socket={this.socket} />}
				</GameFrame>
			</Content>
		);
	}
}

export default GameRoomPage = withRouter(GameRoomPage);
