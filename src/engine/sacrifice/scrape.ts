import CoordinateValue from "../../concept/coordinate/coordinate_value";
import Coordinate from "../../concept/coordinate/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Scrape extends SacrificeAdapter {
	constructor(private source: Coordinate[]) {
		super();
		for (let i = 0; i < this.source.length; ++i) {
			this.addGoal(this.source[i].offset(CoordinateValue.UP));
			this.addGoal(this.source[i].offset(CoordinateValue.DOWN));
			this.addGoal(this.source[i].offset(CoordinateValue.LEFT));
			this.addGoal(this.source[i].offset(CoordinateValue.RIGHT));
		}
	}

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
