import GoalBoardOn from "./goal_board_on";
import BoardOn from "../board/board_on";
import Item from "../item";

import EventMove from "../../concept/event/event_move";

export default class GoalItemCleared extends GoalBoardOn {
	constructor(on: BoardOn, private item: Item, private steps: number) {
		super(on);
		let self: GoalItemCleared = this;

		this.initImage(this.item);
		this.initStep(steps);

		this.on.onItemClear(function(cleared: Item) {
			if (self.item.equals(cleared)) {
				self.stepsMinus();
			}
		});
	}

	getSteps(): number {
		return this.steps;
	}

	private stepsMinus(): void {
		if (this.steps == 0) {
			return;
		}
		this.steps--;
		this.stepLocus.setEvent(
			new EventMove<number>(this.steps, GoalItemCleared.STEP_MINUS_TIME_COST, false, function(
				from: number,
				to: number,
				timeCost: number,
				relativeTime: number
			): number {
				return Math.floor(((to - from) * relativeTime) / timeCost + from);
			})
		);
		if (this.isSuccess()) {
			for (let i = 0; i < this.successListener.length; i++) {
				this.successListener[i]();
			}
		}
	}

	private static readonly STEP_MINUS_TIME_COST: number = 300;

	private successListener: (() => void)[] = [];
	onSuccess(listener: () => void): void {
		if (listener == null) {
			return;
		}
		this.successListener.push(listener);
	}
	isSuccess(): boolean {
		return this.steps == 0;
	}
}
