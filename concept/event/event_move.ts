import EventAdapter from "./event_adapter";

export default class EventMove<T> extends EventAdapter<T> {
	private to: T;
	private timeCost: number;
	private move: (from: T, to: T, timeCost: number, timeStamp: number) => T;

	constructor(to: T, timeCost: number, move: (from: T, to: T, timeCost: number, relativeTime: number) => T) {
		super();
		this.to = to;
		this.timeCost = timeCost;
		this.move = move;
	}

	getLocation(timeStamp: number): T {
		if (timeStamp <= this.startStamp) {
			return this.from;
		}
		if (timeStamp >= this.startStamp + this.timeCost) {
			return this.to;
		}
		return this.move(this.from, this.to, this.timeCost, timeStamp - this.startStamp);
		// return this.from.offsetTo(this.to, (timeStamp - this.startStamp) / this.timeCost);
	}

	getEndLocation(): T {
		return this.to;
	}
}
