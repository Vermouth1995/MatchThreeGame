import EventAdapter from "./event_adapter";

export default class EventLocationSetter<T> extends EventAdapter<T> {
	private newLocation: T;

	constructor(newLocation: T) {
		super();
		this.newLocation = newLocation;
	}
	getLocation(timeStamp: number): T {
		return this.newLocation;
	}

	getEndLocation(): T {
		return this.newLocation;
	}
}
