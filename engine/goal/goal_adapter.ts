import Goal from "../goal";
import PuzzleKeeper from "../puzzle_keeper";

import Locus from "../../concept/locus";
import Coordinate from "../../concept/coordinate";
import Color from "../../concept/color";
import Font from "../../concept/font";

import AtomString from "../../render/atom/atom_string";
import Puzzle from "../../render/puzzle";

export default abstract class GoalAdapter implements Goal {
	protected stepsAtom: AtomString;

	private color: Color = new Color(0, 0, 0);
	private font: Font = new Font().setSize(0.3).setAlign(Font.ALIGN_CENTER);
	private static readonly PUZZLE_IMAGE_ID_Z_INDEX = 1;
	private static readonly PUZZLE_STEPS_Z_INDEX = 2;
	private static readonly PUZZLE_IMAGE_ID_LOCATION = Coordinate.ORIGIN;
	private static readonly PUZZLE_STEPS_LOCATION = new Coordinate(0.8, 0.8);
	constructor() {
		this.puzzle.setSize(Coordinate.UNIT);
	}

	initImage(image: PuzzleKeeper) {
		this.puzzle.addChild(
			image.getPuzzle(),
			new Locus<Coordinate>(GoalAdapter.PUZZLE_IMAGE_ID_LOCATION),
			GoalAdapter.PUZZLE_IMAGE_ID_Z_INDEX
		);
	}

	initStep(steps: number) {
		this.stepLocus = new Locus<number>(steps);
		this.puzzle.addAtom(
			new AtomString(this.stepLocus, new Locus<Color>(this.color), new Locus<Font>(this.font)),
			new Locus<Coordinate>(GoalAdapter.PUZZLE_STEPS_LOCATION),
			GoalAdapter.PUZZLE_STEPS_Z_INDEX
		);
	}

	protected stepLocus: Locus<number>;

	abstract onSuccess(success: () => void): void;
	abstract isSuccess(): boolean;

	protected puzzle: Puzzle = new Puzzle();
	getPuzzle(): Puzzle {
		return this.puzzle;
	}
}
