import Coordinate from "../../coordinate";
import EventAdapter from "./event_adapter";
export default class EventKeep extends EventAdapter {
	getLocation(timeStamp: number): Coordinate {
		return this.from;
	}
}
