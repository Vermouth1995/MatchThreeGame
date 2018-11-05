import Event from "../event";
import Coordinate from "../../coordinate";
import Once from "../../once";
import OnceFirst from "../../once/once_first";
export default abstract class EventAdapter implements Event {
	protected from: Coordinate = EventAdapter.DEFAULT_NOW;

	setFrom(from: Coordinate) {
		this.from = from;
	}

	protected startStamp: number = EventAdapter.DEFAULT_START_STAMP;

	start() {
		this.startStamp = Date.now();
	}

	protected end() {
		if (this.endBack != null) {
			this.endBack.getCallback()();
		}
	}

	private endBack: Once;

	onEnd(endBack: () => void) {
		var back: Once = new OnceFirst();
		back.setCallback(endBack);
		this.endBack = back;
	}

	static readonly DEFAULT_NOW = Coordinate.ORIGIN;
	static readonly DEFAULT_START_STAMP = Number.MAX_VALUE;

	getLocationNow(): Coordinate {
		return this.getLocation(Date.now());
	}

	abstract getLocation(timeStamp: number): Coordinate;
}
