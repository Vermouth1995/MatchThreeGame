import Level from "./level";
import Board from "../engine/board";
import Score from "../engine/Score";
import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";
import Puzzle from "../render/puzzle";
import Game from "../game/game";
export default abstract class LevelAdapter implements Level {
	static readonly PUZZLE_BOARD_Z_INDEX = 1;
	static readonly PUZZLE_SCORE_Z_INDEX = 1;

	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	protected board: Board;
	protected score: Score;

	private puzzle: Puzzle;

	constructor() {
		this.board = new Board();
		this.score = new Score();
		this.puzzle = new Puzzle();
		this.init();
		this.getPuzzle().setSize(Game.RENDER_SIZE);
		this.getPuzzle().addChild(
			this.board.getPuzzle(),
			new Locus(Game.RENDER_SIZE.offset(this.board.size().negative()).split(LevelAdapter.SPLIT_HALF)),
			LevelAdapter.PUZZLE_BOARD_Z_INDEX
		);

		this.getPuzzle().addChild(
			this.score.getPuzzle(),
			new Locus(new Coordinate((Game.RENDER_SIZE.row - this.score.getPuzzle().size().row) / 2, 0)),
			LevelAdapter.PUZZLE_SCORE_Z_INDEX
		);
		this.board.start();
	}

	abstract init(): void;

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	private name: string;
	setName(name: string): void {
		this.name = name;
		this.score.setLevel(name);
	}
}
