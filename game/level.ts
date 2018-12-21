import LevelDate from "./level_date";

import Board from "../engine/board";
import Score from "../engine/Score";

import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";

import Puzzle from "../render/puzzle";
import Render from "../render/render";
import AtomImage from "../render/atom/atom_image";

export default class Level {
	static readonly PUZZLE_BOARD_Z_INDEX = 1;
	static readonly PUZZLE_SCORE_Z_INDEX = 1;
	static readonly PUZZLE_BACKGROUND_IMAGE_Z_INDEX = 0;

	static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private static readonly SPLIT_HALF = new Coordinate(2, 2);

	protected board: Board;
	protected score: Score;

	private puzzle: Puzzle;
	constructor(private name: string, private size: Coordinate, private date: LevelDate) {
		let self = this;

		this.board = new Board();

		this.board.setCells(this.date.getCells(), this.date.getBirths(), this.date.getExits());

		this.score = new Score();
		this.score.setOn(this.board.getOn());
		this.score.setStep(this.date.getStep());
		this.score.addGoal(this.date.getGoals(this.board.getOn()));
		this.score.setLevel(this.name);

		this.score.onStepEnd(function() {
			self.board.close();
		});
		this.score.onEnd(function(success: boolean) {
			self.board.close();
			self.end(success);
		});

		this.puzzle = new Puzzle();
		this.puzzle.setSize(self.size);
		this.puzzle.addAtom(
			new AtomImage(new Locus<number>(Level.backgroundImageId), new Locus<Coordinate>(this.size)),
			new Locus<Coordinate>(Coordinate.ORIGIN),
			Level.PUZZLE_BACKGROUND_IMAGE_Z_INDEX
		);
		this.puzzle.addChild(
			this.board.getPuzzle(),
			new Locus(self.size.offset(this.board.size().negative()).split(Level.SPLIT_HALF)),
			Level.PUZZLE_BOARD_Z_INDEX
		);

		this.puzzle.addChild(
			this.score.getPuzzle(),
			new Locus(new Coordinate((self.size.row - this.score.getPuzzle().size().row) / 2, 0)),
			Level.PUZZLE_SCORE_Z_INDEX
		);
		this.board.start();
	}

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

	getName(): string {
		return this.name;
	}

	private static readonly backgroundImagePath: string = "/level_background.jpg";
	private static backgroundImageId: number;

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		Level.backgroundImageId = render.registeredImage(Level.backgroundImagePath, onSuccess, onError);
	}
}
