import React from "react";
import styled from "styled-components";

const canvas = styled.canvas`
	z-index: 1;
	position: absolute;
`;

export default class GameRenderer extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		this.canvasW = 500;
		this.canvasH = 500;
		this.gridSize = 100;
		this.cellW = this.canvasW / this.gridSize;
		this.cellH = this.canvasH / this.gridSize;
		this.canvas = this.canvasRef.current;
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.canvasW;
		this.canvas.height = this.canvasH;

		// window.addEventListener("resize", () => {
		// 	this.canvasRef.current.width = this.canvasSize;
		// 	this.canvasRef.current.height = this.canvasSize;
		// });

		this.count = 0;

		this.player = {
			x: this.gridSize / 2,
			y: this.gridSize / 2,
			dx: 1,
			dy: 0,
			cells: []
		};

		// listen to keyboard events to move the this.player
		document.addEventListener("keydown", e => {
			// prevent this.player from backtracking on itself by checking that it's
			// not already moving on the same axis (pressing left while moving
			// left won't do anything, and pressing right while moving left
			// shouldn't let you collide with your own body)

			// left arrow key
			if (e.which === 37 && this.player.dx === 0) {
				this.player.dx = -1;
				this.player.dy = 0;
			}
			// up arrow key
			else if (e.which === 38 && this.player.dy === 0) {
				this.player.dy = -1;
				this.player.dx = 0;
			}
			// right arrow key
			else if (e.which === 39 && this.player.dx === 0) {
				this.player.dx = 1;
				this.player.dy = 0;
			}
			// down arrow key
			else if (e.which === 40 && this.player.dy === 0) {
				this.player.dy = 1;
				this.player.dx = 0;
			}
		});
		console.log(` direction ${this.player.dx} ${this.player.dy} `);
		requestAnimationFrame(this.loop);
	}

	// game loop
	loop = () => {
		requestAnimationFrame(this.loop);
		// slow game loop to 15 fps instead of 60 (60/15 = 4)
		if (++this.count < 4) {
			return;
		}
		this.count = 0;
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.lineWidth = 2;
		this.context.strokeStyle = "white";
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		// move this.player by it's velocity
		this.player.x += this.player.dx;
		this.player.y += this.player.dy;
		// wrap this.player position horizontally on edge of screen
		if (this.player.x < 0) {
			this.player.x = this.gridSize;
		} else if (this.player.x >= this.gridSize) {
			this.player.x = 0;
		}

		// wrap this.player position vertically on edge of screen
		if (this.player.y < 0) {
			this.player.y = this.gridSize;
		} else if (this.player.y >= this.gridSize) {
			this.player.y = 0;
		}
		console.log(`x: ${this.player.x}, y: ${this.player.y} ${this.cellSize}`);
		// keep track of where this.player has been. front of the array is always the head
		this.player.cells.unshift({ x: this.player.x, y: this.player.y });
		this.context.fillStyle = "#03DAC5";
		this.player.cells.forEach(cell => {
			// drawing 1 px smaller than the this.grid creates a this.grid effect in the this.player body so you can see how long it is
			this.context.fillRect(
				cell.x * this.cellW,
				cell.y * this.cellH,
				this.cellW,
				this.cellH
			);
		});
	};

	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
