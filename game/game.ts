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
	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	private static readonly BOARD_Z_INDEX = 1000;

	private levelIndex: number = 1;

	constructor(render: Render) {
		this.render = render;
	}

	startLevel(index: number) {
		this.render.clear();
		let level: Level = LevelCreator.getLevel(index);
		let board = new Board();
		level.init(board);
		this.render
			.getRootPuzzle()
			.addChild(
				board.getPuzzle(),
				Game.RENDER_SIZE.offset(board.size().negative()).split(Game.SPLIT_HALF),
				Game.BOARD_Z_INDEX
			);
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
