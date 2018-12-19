import Event from "./event";
import EventKeep from "./event/event_keep";

export default class Locus<T> {
	constructor(private location: T) {
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
			this.location = this.event.getEndLocation(Date.now());
		}
		event.setFrom(this.location);
		this.event = event;
		event.start(Date.now());
	}
}
