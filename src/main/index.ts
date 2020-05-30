import RenderCanvas from "../platform/canvas/render_canvas";
import Game from "../game/game";
import Coordinate from "../concept/coordinate";

export default class MatchThreeGame {
	constructor() {
		const container: HTMLElement = document.getElementById(MatchThreeGame.ContainerId);
		const pixel: Coordinate = new Coordinate(window.innerHeight, window.innerWidth);
		const render: RenderCanvas = new RenderCanvas(
			Game.RENDER_SIZE,
			pixel,
			// MatchThreeGame.PixelSize,
			MatchThreeGame.StaticResourcePrefix
		);

		const main: Game = new Game(render);
		const canvasElement = render.getCanvasElement();
		canvasElement.style.position = "fixed";
		canvasElement.style.top = "0px";
		canvasElement.style.left = "0px";
		container.appendChild(canvasElement);

		main.start((error: Error) => {
			console.log(error);
		});
	}

	static readonly PixelSize: Coordinate = new Coordinate(680, 1360);

	static readonly ContainerId: string = "match_three_game";
	static readonly StaticResourcePrefix: string = "./resource";
}

new MatchThreeGame();
