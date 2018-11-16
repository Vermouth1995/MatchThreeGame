import Level from "./level";
import Board from "../engine/board";
import Coordinate from "../concept/coordinate";
import Puzzle from "../render/puzzle";
import Game from "../game/game";
export default abstract class LevelAdapter implements Level {
	static readonly PUZZLE_BOARD_Z_INDEX = 1;

	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	protected board: Board;

	private puzzle: Puzzle;

	constructor() {
		this.board = new Board();
		this.puzzle = new Puzzle();
		this.getPuzzle().addChild(
			this.board.getPuzzle(),
			Game.RENDER_SIZE.offset(this.board.size().negative()).split(LevelAdapter.SPLIT_HALF),
			LevelAdapter.PUZZLE_BOARD_Z_INDEX
		);
		this.init();
	}

	abstract init(): void;

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
}
