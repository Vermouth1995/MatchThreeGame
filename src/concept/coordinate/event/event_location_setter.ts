import EventAdapter from "./event_adapter";

export default class EventLocationSetter<T> extends EventAdapter<T> {
	constructor(private newLocation: T) {
		super();
	}
	getLocation(timeStamp: number): T {
		return this.newLocation;
	}

	getEndLocation(timeStamp: number): T {
		return this.newLocation;
	}
}
