import Event from "../event";

export default abstract class EventAdapter<T> implements Event<T> {
	protected from: T;

	setFrom(from: T) {
		this.from = from;
	}

	protected startStamp: number = EventAdapter.DEFAULT_START_STAMP;

	start(startStamp: number) {
		this.startStamp = startStamp;
	}

	static readonly DEFAULT_START_STAMP = Number.MAX_VALUE;

	abstract getLocation(timeStamp: number): T;
	abstract getEndLocation(timeStamp: number): T;
}
