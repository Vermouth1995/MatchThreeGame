import LevelData from "./level_data";

import Board from "../engine/board/board";
import Score from "../engine/score";

import CoordinateDynamic from "../concept/coordinate/coordinate_dynamic";
import CoordinateValue from "../concept/coordinate/coordinate_value";
import Coordinate from "../concept/coordinate/coordinate";
import Locus from "../concept/coordinate/locus";
import ListenerDiffusion from "../concept/listener/listener_diffusion";
import Listener from "../concept/listener/listener";

import Puzzle from "../render/puzzle";
import Render from "../render/render";
import AtomImage from "../render/atom/atom_image";
import PuzzleKeeper from "../engine/puzzle_keeper";

export default class Level implements PuzzleKeeper {
	static readonly PUZZLE_BOARD_Z_INDEX = 1;
	static readonly PUZZLE_SCORE_Z_INDEX = 1;
	static readonly PUZZLE_BACKGROUND_IMAGE_Z_INDEX = 0;

	static readonly ENGINE_SIZE = new CoordinateValue(9, 12);

	private static readonly SPLIT_HALF = new CoordinateValue(2, 2);

	protected board: Board;
	protected score: Score;
	protected boardLocation: Locus<Coordinate>;
	protected scoreLocation: Locus<Coordinate>;
	protected backgroundSize: Locus<Coordinate>;
	private puzzle: Puzzle;
	constructor(private name: string, private size: Coordinate, private data: LevelData) {
		this.board = new Board();
		this.board.setCells(this.data.getCells(), this.data.getBirths(), this.data.getExits());

		this.score = new Score();
		this.score.setOn(this.board.getOn());
		this.score.setStep(this.data.getStep());
		this.score.addGoal(this.data.getGoals(this.board.getOn()));
		this.score.setLevel(this.name);
		this.score.onStepEnd.on(() => {
			this.board.close();
		});
		this.score.onEnd.on((success: boolean) => {
			this.board.close();
			this.onEnd.trigger(success);
		});

		const dynamicSize = new CoordinateDynamic(
			() => this.size.getRow(),
			() => this.size.getCol()
		);
		this.puzzle = new Puzzle();
		this.puzzle.setSize(dynamicSize);
		this.boardLocation = new Locus(dynamicSize.offset(this.board.size().negative()).split(Level.SPLIT_HALF));
		this.scoreLocation = new Locus(
			new CoordinateDynamic(
				() => (dynamicSize.getRow() - this.score.getPuzzle().size().getRow()) / 2,
				() => 0
			)
		);
		this.backgroundSize = new Locus<Coordinate>(dynamicSize);
		this.puzzle.addAtom(
			new AtomImage(new Locus<number>(Level.backgroundImageId), this.backgroundSize),
			new Locus<Coordinate>(CoordinateValue.ORIGIN),
			Level.PUZZLE_BACKGROUND_IMAGE_Z_INDEX
		);
		this.puzzle.addChild(this.board.getPuzzle(), this.boardLocation, Level.PUZZLE_BOARD_Z_INDEX);
		this.puzzle.addChild(this.score.getPuzzle(), this.scoreLocation, Level.PUZZLE_SCORE_Z_INDEX);
		this.board.start();
	}

	resizePuzzle(size: Coordinate): void {
		this.size = size;
	}

	readonly onEnd: Listener<void, (success: boolean) => void> = new ListenerDiffusion();

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
