import React from "react";
import styled from "styled-components";

const canvas = styled.canvas`
	z-index: 1;
	position: absolute;
`;
const GRID_SIZE = 100;

const color_palette = ["#000", "#eb7070", "#fec771", "#e6e56c", "#64e291"];
export default class GameRenderer extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.map = new Array(GRID_SIZE)
			.fill(0)
			.map(() => new Array(GRID_SIZE).fill(0));
	}

	componentDidMount() {
		console.log("CANVAS REDERED");
		this.canvasW = 500;
		this.canvasH = 500;
		this.cellW = this.canvasW / GRID_SIZE;
		this.cellH = this.canvasH / GRID_SIZE;
		this.canvas = this.canvasRef.current;
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.canvasW;
		this.canvas.height = this.canvasH;

		// window.addEventListener("resize", () => {
		// 	this.canvasRef.current.width = this.canvasSize;
		// 	this.canvasRef.current.height = this.canvasSize;
		// });

		this.context.lineWidth = 2;
		this.context.strokeStyle = "white";
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

		// listen to keyboard keystrock to server
		document.addEventListener("keydown", e => {
			this.props.socket.emit("GAME__DIR_UPDATE", {
				token: this.props.token,
				key: e.which
			});
		});
		// listen to game update
		this.props.socket.on("GAME__UPDATE", this._updateGameState);
	}

	_updateGameState = players => {
		const context = this.canvas.getContext("2d");
		// update map
		players.forEach(player => {
			this.map[player.y][player.x] = player.gameId;
		});
		// redraw updated map
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map.length; x++) {
				if (this.map[y][x] !== 0) {
					context.fillStyle = color_palette[this.map[y][x]];
					context.fillRect(
						x * this.cellW,
						y * this.cellH,
						this.cellW,
						this.cellH
					);
				}
			}
		}
	};

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
