import Event from "./event";
import EventKeep from "./event/event_keep";

export default class Locus<T> {
	private location: T;
	constructor(location: T) {
		this.location = location;
		this.initEvent();
	}

	private initEvent() {
		this.setEvent(new EventKeep<T>());
	}

	getLocation(timeStamp: number): T {
		this.location = this.event.getLocation(timeStamp);
		return this.location;
	}

	private event: Event<T>;

	setEvent(event: Event<T>) {
		if (this.event != null) {
			this.location = this.event.getEndLocation();
		}
		event.setFrom(this.location);
		this.event = event;
		event.start(Date.now());
	}
}
