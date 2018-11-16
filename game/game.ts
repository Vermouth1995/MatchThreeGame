import Render from "../render/render";
import Board from "../engine/board";
import Level from "../level/level";
import LevelCreator from "../level/level_creator";
import Coordinate from "../concept/coordinate";
import OnceLast from "../concept/once/once_last";
import ItemCreator from "../engine/item_creator";
import CellCreator from "../engine/cell_creator";
export default class Game {
	private render: Render;

	static readonly RENDER_SIZE = new Coordinate(10, 20);

	static readonly PUZZLE_LEVEL_Z_INDEX = 1;

	private levelIndex: number = 1;

	constructor(render: Render) {
		this.render = render;
	}

	private level: Level;

	startLevel(index: number) {
		this.render.clear();
		this.level = LevelCreator.getLevel(index);
		this.render.getRootPuzzle().addChild(this.level.getPuzzle(), Coordinate.ORIGIN, Game.PUZZLE_LEVEL_Z_INDEX);
	}

	closeLevel() {
		if (this.level != null) {
			this.render.getRootPuzzle().removeChild(this.level.getPuzzle());
		}
	}

	start(onError: (error: Error) => void) {
		this.startLevel(this.levelIndex);
		let self: Game = this;
		this.LoadStaticResource(
			this.render,
			function() {
				self.render.start();
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

	LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		let success: OnceLast = new OnceLast();
		success.setCallback(onSuccess);
		ItemCreator.LoadStaticResource(render, success.getCallback(), onError);
		Board.LoadStaticResource(render, success.getCallback(), onError);
		CellCreator.LoadStaticResource(render, success.getCallback(), onError);
	}
}
