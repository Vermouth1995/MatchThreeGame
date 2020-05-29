import EventAdapter from "./event_adapter";

export default class EventMove<T> extends EventAdapter<T> {
	constructor(
		private to: T,
		private timeCost: number,
		private safe: boolean,
		private move: (from: T, to: T, timeCost: number, relativeTime: number) => T
	) {
		super();
	}

	getLocation(timeStamp: number): T {
		if (timeStamp <= this.startStamp) {
			return this.from;
		}
		if (timeStamp >= this.startStamp + this.timeCost) {
			return this.to;
		}
		return this.move(this.from, this.to, this.timeCost, timeStamp - this.startStamp);
	}

	getEndLocation(timeStamp: number): T {
		if (this.safe) {
			return this.to;
		} else {
			return this.getLocation(timeStamp);
		}
	}
}
