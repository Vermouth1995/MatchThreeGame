import RenderCanvas from "../../platform/canvas/render_canvas";
import Game from "../../game/game";
import Coordinate from "../../concept/coordinate";
export default class MatchThreeGame {
	constructor() {
		let container: HTMLElement = document.getElementById(MatchThreeGame.ContainerId);

		let render: RenderCanvas = new RenderCanvas(
			Game.RENDER_SIZE,
			MatchThreeGame.PixelSize,
			MatchThreeGame.StaticResourcePrefix
		);

		let main: Game = new Game(render);

		container.appendChild(render.getCanvasElement());

		main.start(function(error: Error) {
			console.log(error);
		});
	}

	static readonly PixelSize: Coordinate = new Coordinate(680, 1360);

	static readonly ContainerId: string = "match_three_game";
	static readonly StaticResourcePrefix: string = "../../resource";
}

new MatchThreeGame();
