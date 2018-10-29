import Coordinate from "../../coordinate";
import EventAdapter from "./event_adapter";
export default class EventKeep extends EventAdapter {
	getLocation(): Coordinate {
		return this.from;
	}
}
