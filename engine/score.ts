import PuzzleKeeper from "./puzzle_keeper";
import Goal from "./goal";

import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";
import Font from "../concept/font";
import Color from "../concept/color";
import EventLocationSetter from "../concept/event/event_location_setter";
import EventMove from "../concept/event/event_move";

import AtomString from "../render/atom/atom_string";
import Puzzle from "../render/puzzle";
import Render from "../render/render";

export default class Score implements PuzzleKeeper {
	private static readonly STEP_ADD_TIME_COST_PER_STEP: number = 200;
	private static readonly LEVEL_Z_INDEX: number = 1;
	private static readonly GOAL_Z_INDEX: number = 2;
	private static readonly STEP_Z_INDEX: number = 1;
	private static readonly LEVEL_LOCATION: Coordinate = new Coordinate(0.5, 1);
	private static readonly GOAL_LOCATION: Coordinate = new Coordinate(1, 0.5);
	private static readonly GOAL_LOCATION_END: Coordinate = new Coordinate(5, 0.5);
	private static readonly STEP_LOCATION: Coordinate = new Coordinate(5.5, 1);

	private color: Color = new Color(0, 0, 0);
	private font: Font = new Font().setSize(0.5).setAlign(Font.ALIGN_CENTER);

	private step: number = 1;
	private stepRender: Locus<string> = new Locus<string>(this.step.toString());

	private level: string = "unknown";
	private levelRender: Locus<string> = new Locus<string>(this.level.toString());

	private puzzle: Puzzle = new Puzzle();

	constructor() {
		this.puzzle.setSize(new Coordinate(6, 2));
		this.puzzle.addAtom(
			new AtomString(this.stepRender, new Locus<Color>(this.color), new Locus<Font>(this.font)),
			new Locus<Coordinate>(Score.STEP_LOCATION),
			Score.STEP_Z_INDEX
		);
		this.puzzle.addAtom(
			new AtomString(this.levelRender, new Locus<Color>(this.color), new Locus<Font>(this.font)),
			new Locus<Coordinate>(Score.LEVEL_LOCATION),
			Score.LEVEL_Z_INDEX
		);
	}

	private goals: Goal[] = [];

	addGoal(goals: Goal[]) {
		let self: Score = this;
		this.goals = goals;
		goals.map(function(goal: Goal, index: number) {
			self.puzzle.addChild(
				goal.getPuzzle(),
				new Locus<Coordinate>(Score.GOAL_LOCATION.offsetTo(Score.GOAL_LOCATION_END, index / (self.goals.length) )),
				Score.GOAL_Z_INDEX
			);
		});
	}

	setLevel(level: string) {
		this.level = level;
		this.levelRender.setEvent(new EventLocationSetter<string>(this.level));
	}

	setStep(step: number) {
		this.step = step;
		this.stepRender.setEvent(new EventLocationSetter<string>(this.step.toString()));
	}

	stepReduce() {
		this.step--;
		this.stepRender.setEvent(new EventLocationSetter<string>(this.step.toString()));
	}

	stepAdd(newStep: number) {
		let finalStep: number = this.step + newStep;
		this.stepRender.setEvent(
			new EventMove<string>(finalStep.toString(), newStep * Score.STEP_ADD_TIME_COST_PER_STEP, function(
				from: string,
				to: string,
				timecost: number,
				relativeTime: number
			): string {
				return Math.floor(this.step + (newStep * relativeTime) / timecost).toString();
			})
		);
		this.step = finalStep;
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		onSuccess();
	}
}
