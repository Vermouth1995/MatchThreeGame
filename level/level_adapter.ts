import Level from "./level";
import Goal from "../engine/goal";
import Board from "../engine/board";
import Score from "../engine/Score";
import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";
import Puzzle from "../render/puzzle";
import Game from "../game/game";

import BoardOn from "../engine/board/board_on";
import BoardCells from "../engine/board/board_cells";
import BoardBirths from "../engine/board/board_births";
import BoardExits from "../engine/board/board_exits";

export default abstract class LevelAdapter implements Level {
	static readonly PUZZLE_BOARD_Z_INDEX = 1;
	static readonly PUZZLE_SCORE_Z_INDEX = 1;

	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	protected board: Board;
	protected score: Score;

	private puzzle: Puzzle;

	constructor() {
		let self = this;

		this.board = new Board();

		this.board.setCells(this.getCells(), this.getBirths(), this.getExits());

		this.score = new Score();
		this.score.setOn(this.board.getOn());
		this.score.setStep(this.getStep());
		this.score.addGoal(this.getGoals(this.board.getOn()));

		this.score.onStepEnd(function() {
			self.board.close();
		});
		this.score.onEnd(function(success: boolean) {
			self.board.close();
			self.end(success);
		});

		this.puzzle = new Puzzle();
		this.puzzle.setSize(Game.RENDER_SIZE);
		this.puzzle.addChild(
			this.board.getPuzzle(),
			new Locus(Game.RENDER_SIZE.offset(this.board.size().negative()).split(LevelAdapter.SPLIT_HALF)),
			LevelAdapter.PUZZLE_BOARD_Z_INDEX
		);

		this.puzzle.addChild(
			this.score.getPuzzle(),
			new Locus(new Coordinate((Game.RENDER_SIZE.row - this.score.getPuzzle().size().row) / 2, 0)),
			LevelAdapter.PUZZLE_SCORE_Z_INDEX
		);
		this.board.start();
	}

	abstract getBirths(): BoardBirths;
	abstract getExits(): BoardExits;
	abstract getCells(): BoardCells;
	abstract getGoals(on: BoardOn): Goal[];
	abstract getStep(): number;

	private endListener: ((success: boolean) => void)[] = [];

	private end(success: boolean) {
		for (let i = 0; i < this.endListener.length; i++) {
			this.endListener[i](success);
		}
	}

	onEnd(listener: (success: boolean) => void) {
		if (listener == null) {
			return;
		}
		this.endListener.push(listener);
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	private name: string;

	setName(name: string): void {
		this.name = name;
		this.score.setLevel(name);
	}

	getName(): string {
		return this.name;
	}
}
