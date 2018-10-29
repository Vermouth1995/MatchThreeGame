import Coordinate from "../../coordinate";
import EventAdapter from "./event_adapter";
export default class EventMove extends EventAdapter {
	private to: Coordinate;
	private longStamp: number;
	constructor(to: Coordinate, longStamp: number) {
		super();
		this.to = to;
		this.longStamp = longStamp;
	}

	getLocation(): Coordinate {
		let now: number = Date.now();
		if (now <= this.startStamp) {
			return this.from;
		}
		if (now >= this.startStamp + this.longStamp) {
			this.end();
			return this.to;
		}
		return this.from.offsetTo(this.to, (now - this.startStamp) / this.longStamp);
	}
}
