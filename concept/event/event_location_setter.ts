import Coordinate from "../../concept/coordinate";
import EventAdapter from "./event_adapter";
export default class EventLocationSetter extends EventAdapter {
	private newLocation: Coordinate;

	constructor(newLocation: Coordinate) {
		super();
		this.newLocation = newLocation;
	}
	getLocation(timeStamp: number): Coordinate {
		return this.newLocation;
	}

	getEndLocation(): Coordinate {
		return this.newLocation;
	}
}
