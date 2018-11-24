import Coordinate from "../../concept/coordinate";
import EventAdapter from "./event_adapter";
export default class EventMove extends EventAdapter {
	private to: Coordinate;
	private timeCost: number;
	constructor(to: Coordinate, timeCost: number) {
		super();
		this.to = to;
		this.timeCost = timeCost;
	}

	getLocation(timeStamp: number): Coordinate {
		if (timeStamp <= this.startStamp) {
			return this.from;
		}
		if (timeStamp >= this.startStamp + this.timeCost) {
			return this.to;
		}
		return this.from.offsetTo(this.to, (timeStamp - this.startStamp) / this.timeCost);
	}

	getEndLocation(): Coordinate {
		return this.to;
	}
}
