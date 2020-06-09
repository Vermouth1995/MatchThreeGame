import RenderCanvas from "../platform/canvas/render_canvas";
import Game from "../game/game";
import Coordinate from "../concept/coordinate";

export default class MatchThreeGame {
	constructor() {
		const container: HTMLElement = document.getElementById(MatchThreeGame.ContainerId);
		const render: RenderCanvas = new RenderCanvas(
			container,
			Game.MIN_RENDER_SIZE,
			MatchThreeGame.StaticResourcePrefix
		);
		const main: Game = new Game(render);
		main.start((error: Error) => {
			console.log(error);
		});
	}

	static readonly ContainerId: string = "match_three_game";
	static readonly StaticResourcePrefix: string = "./resource";
}

new MatchThreeGame();
