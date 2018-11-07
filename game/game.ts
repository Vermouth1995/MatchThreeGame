import Render from "../render/render";
import Board from "../engine/board";
import Level from "../level/level";
import LevelCreator from "../level/level_creator";
import Coordinate from "../concept/coordinate";

export default class Game {
	private render: Render;

	static readonly RENDER_SIZE = new Coordinate(10, 20);
	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	private levelIndex: number = 1;

	constructor(render: Render) {
		this.render = render;
	}

	startLevel(index: number) {
		this.render.clear();
		let level: Level = LevelCreator.getLevel(index);
		let board = new Board();
		level.init(board);
		this.render.addPuzzle(board, Game.RENDER_SIZE.offset(board.renderSize().negative()).split(Game.SPLIT_HALF));
	}

	start() {
		this.startLevel(this.levelIndex);
		this.render.start();
	}

	close() {
		this.render.clear();
		this.render.close();
	}
}
