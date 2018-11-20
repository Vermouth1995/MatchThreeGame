import Coordinate from "../../concept/coordinate";
import EventAdapter from "./event_adapter";
export default class EventFromSetter extends EventAdapter {
	private newFrom: Coordinate;

	constructor(newFrom: Coordinate) {
		super();
		this.newFrom = newFrom;
	}
	getLocation(timeStamp: number): Coordinate {
		return this.newFrom;
	}

	getEndLocation(): Coordinate {
		return this.newFrom;
	}
}
