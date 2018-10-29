import Coordinate from "../coordinate";
import Event from "./event";
import EventKeep from "./event/event_keep";

export default class Atom {
	private id: number;
	private location: Coordinate;
	constructor(id: number, location: Coordinate) {
		this.id = id;
		this.location = location;

		this.initEvent();
	}

	private initEvent() {
		this.setEvent(new EventKeep());
	}

	getId(): number {
		return this.id;
	}

	getLocation(): Coordinate {
		this.location = this.event.getLocation();
		return this.location;
	}

	private event: Event;

	setEvent(event: Event) {
		let self: Atom = this;
		event.setFrom(this.location);
		event.onEnd(function() {
			self.initEvent();
		});
		this.event = event;
		event.start();
	}
}
