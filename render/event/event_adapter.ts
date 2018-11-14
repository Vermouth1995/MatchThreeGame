import Event from "../event";
import Coordinate from "../../concept/coordinate";

export default abstract class EventAdapter implements Event {
	protected from: Coordinate = EventAdapter.DEFAULT_NOW;

	setFrom(from: Coordinate) {
		this.from = from;
	}

	protected startStamp: number = EventAdapter.DEFAULT_START_STAMP;

	start(startStamp: number) {
		this.startStamp = startStamp;
	}

	static readonly DEFAULT_NOW = Coordinate.ORIGIN;
	static readonly DEFAULT_START_STAMP = Number.MAX_VALUE;

	abstract getLocation(timeStamp: number): Coordinate;
	abstract getEndLocation(): Coordinate;
}
