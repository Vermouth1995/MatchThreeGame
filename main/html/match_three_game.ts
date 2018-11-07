import RenderCanvas from "../../render/canvas/render_canvas";
import Game from "../../game/game";
import Coordinate from "../../concept/coordinate";
export default class MatchThreeGame {
	constructor() {
		let container: HTMLElement = document.getElementById(MatchThreeGame.ContainerId);

		let render: RenderCanvas = new RenderCanvas(Game.ENGINE_SIZE, MatchThreeGame.PixelSize);

		let main: Game = new Game(render);

		container.appendChild(render.getCanvasElement());

		main.start();
	}

	static readonly PixelSize: Coordinate = new Coordinate(300, 600);

	static readonly ContainerId: string = "match_three_game";
}

new MatchThreeGame();
