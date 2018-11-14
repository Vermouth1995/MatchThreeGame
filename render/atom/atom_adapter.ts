import Coordinate from "../../concept/coordinate";
import Event from "../event";
import Atom from "../atom";
import EventKeep from "../event/event_keep";
import Render from "../render";

export default abstract class AtomAdapter implements Atom {
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

	abstract draw(render: Render, timeStamp: number, baseLocation: Coordinate): void;
}
