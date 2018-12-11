import GoalBoardOn from "./goal_board_on";
import BoardOn from "../board/board_on";
import Item from "../item";

import EventLocationSetter from "../../concept/event/event_location_setter";

export default class GoalItemCleared extends GoalBoardOn {
	constructor(on: BoardOn, item: Item, steps: number) {
		super(on);
		let self: GoalItemCleared = this;
		this.item = item;
		this.steps = steps;
		this.initImage(this.item);
		this.initStep(steps);

		this.on.onItemClear(function(cleared: Item) {
			if (self.item.equals(cleared)) {
				self.stepsMinus();
			}
		});
	}
	private item: Item;
	private steps: number;

	private stepsMinus(): void {
		if (this.steps == 0) {
			return;
		}
		this.steps--;
		this.stepLocus.setEvent(new EventLocationSetter<string>(this.steps.toString()));
		if (this.isSuccess()) {
			this.successCaller.map((caller: () => void) => {
				caller();
			});
		}
	}

	private successCaller: (() => void)[] = [];
	onSuccess(success: () => void): void {
		if (success) {
			return;
		}
		this.successCaller.push(success);
	}
	isSuccess(): boolean {
		return this.steps == 0;
	}
}
