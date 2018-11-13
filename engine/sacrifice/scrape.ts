import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Scrape extends SacrificeAdapter {
	constructor(source: Coordinate[]) {
		super();
		this.source = source;
		for (let i = 0; i < source.length; ++i) {
			this.addGoal(source[i].offset(Coordinate.UP));
			this.addGoal(source[i].offset(Coordinate.DOWN));
			this.addGoal(source[i].offset(Coordinate.LEFT));
			this.addGoal(source[i].offset(Coordinate.RIGHT));
		}
	}

	private source: Coordinate[];

	private goals: Coordinate[] = [];

	private addGoal(goal: Coordinate) {
		if (goal.isIncluded(this.source) || goal.isIncluded(this.goals)) {
			return;
		}
		this.goals.push(goal);
	}

	getGoals(): Coordinate[] {
		return this.goals;
	}
}
