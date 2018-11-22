import Coordinate from "../../concept/coordinate";
import EventAdapter from "./event_adapter";
export default class EventKeep extends EventAdapter {
	getLocation(timeStamp: number): Coordinate {
		return this.from;
	}

	getEndLocation(): Coordinate {
		return this.from;
	}
}
