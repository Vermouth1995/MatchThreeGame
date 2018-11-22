import Event from "./event";
import EventKeep from "./event/event_keep";
import Coordinate from "../concept/coordinate";

export default class Locus {
	private location: Coordinate;
	constructor(location: Coordinate) {
		this.location = location;
		this.initEvent();
	}

	private initEvent() {
		this.setEvent(new EventKeep());
	}

	getLocation(timeStamp: number): Coordinate {
		this.location = this.event.getLocation(timeStamp);
		return this.location;
	}

	private event: Event;

	setEvent(event: Event) {
		if (this.event != null) {
			this.location = this.event.getEndLocation();
		}
		event.setFrom(this.location);
		this.event = event;
		event.start(Date.now());
	}
}
