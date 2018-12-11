import Render from "../render/render";
import Level from "../level/level";
import LevelCreator from "../level/level_creator";
import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";

export default class Game {
	private render: Render;

	static readonly RENDER_SIZE = new Coordinate(10, 20);

	static readonly PUZZLE_LEVEL_Z_INDEX = 1;

	private levelIndex: number = 1;

	constructor(render: Render) {
		this.render = render;
	}

	private level: Level;

	startLevel(type: string, index: string) {
		this.render.clear();
		this.level = LevelCreator.getLevel(type, index);
		this.render
			.getRootPuzzle()
			.addChild(this.level.getPuzzle(), new Locus(Coordinate.ORIGIN), Game.PUZZLE_LEVEL_Z_INDEX);
		this.level.onEnd(function(success: boolean) {
			console.log("level end : " + success);
		});
	}

	closeLevel() {
		if (this.level != null) {
			this.render.getRootPuzzle().removeChild(this.level.getPuzzle());
		}
	}

	start(onError: (error: Error) => void) {
		let self: Game = this;
		Game.LoadStaticResource(
			this.render,
			function() {
				self.render.start();
				self.startLevel(LevelCreator.TypeCommon, self.levelIndex.toString());
			},
			function(error: Error) {
				onError(error);
			}
		);
	}

	close() {
		this.closeLevel();
		this.render.close();
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		LevelCreator.LoadStaticResource(render, onSuccess, onError);
	}
}
