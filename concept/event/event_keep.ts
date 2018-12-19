import EventAdapter from "./event_adapter";

export default class EventKeep<T> extends EventAdapter<T> {
	getLocation(timeStamp: number): T {
		return this.from;
	}

	getEndLocation(timeStamp: number): T {
		return this.from;
	}
}
