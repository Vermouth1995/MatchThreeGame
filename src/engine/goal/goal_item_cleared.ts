import GoalBoardOn from "./goal_board_on";
import BoardOn from "../board/board_on";
import Item from "../item/item";

import EventMove from "../../concept/coordinate/event/event_move";

export default class GoalItemCleared extends GoalBoardOn {
	constructor(on: BoardOn, private item: Item, private steps: number) {
		super(on);

		this.initImage(this.item);
		this.initStep(steps);

		this.on.onItemClear.on((cleared: Item) => {
			if (this.item.equals(cleared)) {
				this.stepsMinus();
			}
		});
	}

	private static readonly STEP_MINUS_TIME_COST: number = 300;

	getSteps(): number {
		return this.steps;
	}

	private stepsMinus(): void {
		if (this.steps == 0) {
			return;
		}
		this.steps--;
		this.stepLocus.setEvent(
			new EventMove<number>(
				this.steps,
				GoalItemCleared.STEP_MINUS_TIME_COST,
				false,
				(from, to, timeCost, relativeTime) => Math.floor(((to - from) * relativeTime) / timeCost + from)
			)
		);
		if (this.isSuccess()) {
			this.onSuccess.trigger();
		}
	}

	isSuccess(): boolean {
		return this.steps == 0;
	}
}
